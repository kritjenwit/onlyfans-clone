const axios = require("axios");

const BASE_URL = "http://localhost:3000";

async function ping() {
  let apiUrl = `${BASE_URL}/ping`;
  let response = await axios.post(apiUrl);
  return response.data;
}

async function apiLoginWithEmail(email: string, password: string) {
  let apiUrl = `${BASE_URL}/authen/email/login`;
  let response = await axios.post(apiUrl, { email, password });
  return response.data;
}

async function apiLoginWithGmail(email: string) {
  let apiUrl = `${BASE_URL}/authen/gmail/login`;
  let response = await axios.post(apiUrl, { email });
  return response.data;
}

describe("Test Login API", () => {
  it("Server should respond `pong`", async () => {
    let response = await ping();
    expect(response).toBe("pong");
  });

  it("Should login with email and password successfully", async () => {
    let email = "admin@admin.com";
    let password = "123456";
    let response = await apiLoginWithEmail(email, password);

    expect(response).toBe({
      code: 1101,
      message: "Success",
    });
  });

  it("Should login with email and password successfully", async () => {
    let email = "jenwitkmonz@gmail.com";
    let response = await apiLoginWithGmail(email);
    expect(response).toBe({
      code: 1101,
      message: "Success",
    });
  });
});
