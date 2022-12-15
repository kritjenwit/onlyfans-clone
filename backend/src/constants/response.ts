export const RESPONSE = {
  NUMBER_CODE: {
    400: {
      CODE: 400,
      MESSAGE_LIST: {
        REQUIRED: {
          EMAIL: "email is required",
          PASSWORD: "password is required",
          CONFIRM_PASSWORD: "confirm password is required",
        },
        INVALID: {
          EMAIL: "email is invalid",
          PASSWORD: "password is invalid",
        },
        MISSMATCH: {
          PASSWORD_AND_CONFIRM_PASSWORD:
            "Password and confirm password is missmatch",
        },
      },
    },
    500: {
      CODE: 500,
      MESSAGE_LIST: {
        ERROR: {
          DB: "DB Error",
        },
      },
    },
  },
};
