import "dotenv/config";

export const env = process.env;

export const ENVIRONMENT = env.ENVIRONMENT || "development";

export const MAIN_APP_ID = 1;
export const DEFAULT_TYPE = "i1";
export const DEFAULT_PLATFORM = "web";

export const APP_ID = {
    MAIN: 1,
}

export const LOGIN_TYPE = {
  EMAIL: "i1",
  GOOGLE: "gp",
  FACEBOOK: "fb",
};
