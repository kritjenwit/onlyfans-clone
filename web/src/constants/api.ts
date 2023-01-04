export const BASE_API_URL =
  process.env.NEXT_PUBLIC_WEBAPI_URL || "http://localhost:5000";

export const API_URL = {
  AUTHEN: {
    EMAIL: {
      LOGIN: BASE_API_URL + "authen/email/login",
      REGISTER: BASE_API_URL + "authen/email/register",
    },
    GOOGLE: {
      LOGIN: BASE_API_URL + "authen/google/login",
    },
  },
};
