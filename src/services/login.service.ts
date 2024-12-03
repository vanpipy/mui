// import { AuthService } from '@mui/auth-tools';
// import { queryCurrentEnv } from '../utils';
// import { getErpCenterBaseUrl } from './utils';

class AuthService {
  queryAuthKeys() {
    return ['menu_zero', 'menu_one'];
  }
}

// const baseURL = getErpCenterBaseUrl();

// const LOGIN_PATHNAME = '/login';

// const currentEnv = queryCurrentEnv();
// const authService = new AuthService({
//   env: currentEnv,
//   merchantApp: window.origin,
//   baseUrl: baseURL,
//   loginPagePathname: LOGIN_PATHNAME,
// });

const authService = new AuthService();

export const getAuthService = () => authService;
