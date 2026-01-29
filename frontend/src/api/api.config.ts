export const API_CONFIG = {
  // master switch for mock vs real api
  // set to true to use mocks, false to use real spring bootbackend
  USE_MOCKS: false,

  // toggle for specific modules
  MODULES: {
    AUTH: true,
    VACCINE: true,
    HOSPITAL: true,
    APPOINTMENT: true,
    USER: true,
    ADMIN: true,
  },
};
