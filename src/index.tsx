import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createInstance, Piral, createStandardApi } from 'piral';
import { createVue3Api } from 'piral-vue-3';
import { LayoutSetting } from './components/LayoutSetting';
import { NotFound } from './components/Error';

const instance = createInstance({
  state: {
    components: LayoutSetting,
    errorComponents: {
      not_found: NotFound,
    },
  },
  plugins: [...createStandardApi(), createVue3Api()],
});

// instance.root.registerMenu('menu0', () => <span />, {
//   type: 'general',
//   code: 'menu_zero',
//   key: '/primary/zero',
//   label: '一级菜单/0级菜单',
//   priority: 2,
// });
//
// instance.root.registerMenu('menu1', () => <span />, {
//   type: 'general',
//   code: 'menu_one',
//   key: '/primary/one',
//   label: '一级菜单/1级菜单',
//   priority: 2,
// });
//
// instance.root.registerMenu('menu2', () => <span />, {
//   type: 'general',
//   code: 'menu_two',
//   key: '/primary/two',
//   label: '一级菜单/2级菜单',
//   priority: 2,
// });

const root = createRoot(document.querySelector('#app')!);

root.render(<Piral instance={instance} />);
