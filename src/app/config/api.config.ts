/**
 * API Configuration
 * Centraliza todas las URLs de la API en un único lugar
 */

export const API_CONFIG = {
  // Base API URL
  BASE_URL: '/api',

  // Auth endpoints
  AUTH: {
    LOGIN: '/api/Auth/Login',
    REGISTER: '/api/Auth/Register',
    CONFIRM_EMAIL: '/api/Auth/ConfirmEmail',
    GOOGLE_LOGIN: '/api/Auth/GoogleLogin',
  },

  // Account endpoints
  ACCOUNT: {
    BASE: '/api/Account',
    LOGOUT: '/api/Account/Logout',
    PROFILE: '/api/Account/Profile',
    GET_USER_INFO: '/api/Account/GetUserInfo',
    GET_COMMENTS: '/api/Account/GetComments',
    FAVORITES: '/api/Account/Favorites',
    UPDATE: '/api/Account/Update',
    DELETE: '/api/Account/Delete',
    GET_USERS: '/api/Account/GetUsers',
  },

  // Stars endpoints
  STARS: {
    BASE: '/api/Stars',
    GET_ALL: '/api/Stars',
    GET_BY_ID: (id: number) => `/api/Stars/${id}`,
  },

  // Constellations endpoints
  CONSTELLATIONS: {
    BASE: '/api/Constellations',
    GET_ALL: '/api/Constellations',
    GET_BY_ID: (id: number) => `/api/Constellations/${id}`,
    GET_STARS: (id: number) => `/api/Constellations/GetStars/${id}`,
    GET_LINES: '/api/Constellations/ConstelationLines',
    GET_COMMENTS: (id: number) => `/api/Account/GetComments/${id}`,
  },
};
