import * as React from 'react';
import { ComponentsState } from 'piral';
import { PiralCustomMenuSettings } from 'piral-menu';
import { Menu } from 'antd';
import { useHistory, useLocation } from 'react-router';
import { getAuthService } from '../services/login.service';
import { ItemType } from 'antd/es/menu/interface';

const pickMetas = (childNodes: React.ReactNode[]) => {
  const metas: any[] = [];
  childNodes.forEach((node: any) => {
    const { meta } = node.props || {};
    metas.push(meta);
  });
  return metas;
};

const filterByAuthKeys = (menus: PiralCustomMenuSettings[], authKeys: string[]) => {
  const result: PiralCustomMenuSettings[] = [];
  let i = 0;
  while (i < menus.length) {
    const menu = menus[i];
    const { code = '' } = menu || {};
    if (authKeys.includes(code)) {
      result.push(menu);
    }
    i += 1;
  }
  return result;
};

const restructMenuItems = (items: PiralCustomMenuSettings[], result: any[], start = 0) => {
  if (start >= items.length) {
    return result;
  }
  const item = items[start];
  const menuNames = item.label.split('/');
  const menus: any[] = [];

  let i = menuNames.length - 1;
  while (i >= 0) {
    const name = menuNames[i];
    const menu = { key: name, label: name };
    menus.unshift(menu);
    i -= 1;
  }

  const last = menus[menus.length - 1];
  const { label } = last;
  const prefixLabels = menuNames.slice(0, menuNames.length - 1).join('/');
  menus[0] = { ...menus[0], key: prefixLabels };
  menus[menus.length - 1] = { ...item, label }

  i = menuNames.length - 1;
  while (i >= 0) {
    const menu = menus[i];
    if (i + 1 < menuNames.length) {
      menu.children = [menus[i + 1]];
    }
    i -= 1;
  }

  result[start] = menus[0];
  return restructMenuItems(items, result, start + 1);
}

const mergeMenuItems = (menus: any[]) => {
  const result: any[] = [];
  let i = 0;
  while (i < menus.length) {
    const menu = menus[i];
    const existedIndex = result.findIndex((each) => each.key === menu.key);
    if (existedIndex > -1) {
      result[existedIndex].children = result[existedIndex].children.concat(menu.children);
    } else {
      result.push(menu);
    }
    i += 1;
  }
  return result;
}

export const MenuContainer: ComponentsState['MenuContainer'] = props => {
  const { children } = props;
  const [items, setItems] = React.useState<ItemType[]>([]);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = window.location;
  const selectedKeys = pathname.length > 1 ? [pathname] : [];
  const openKeys = selectedKeys.length > 0 ? [`/${selectedKeys[0].split('/')[1]}`] : [];
  const metas = pickMetas(children as React.ReactNode[]);
  const onClickMenu = (menu: any) => {
    const { key } = menu;
    history.push(key);
  };
  const updateMenu = () => {
    const authService = getAuthService();
    const authKeys = authService.queryAuthKeys();
    const newItems = filterByAuthKeys(metas, authKeys);
    const menus = restructMenuItems(newItems, []);
    const merged = mergeMenuItems(menus);
    setItems(merged);
  };
  React.useEffect(() => {
    updateMenu();
  }, [location]);
  return (
    <div className="menu-container">
      <Menu
        style={{ border: 0, paddingInlineStart: 8, paddingBlockStart: 8 }}
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        mode="inline"
        items={items}
        onClick={onClickMenu}
      />
    </div>
  );
};
