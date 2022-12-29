import axios from "axios";
import { env } from "../../src/config";

async function ping(baseUrl: string) {
  let apiUrl = `${baseUrl}ping`;
  let response = await axios.get(apiUrl);
  return response.data;
}

async function apiLoginWithEmail(
  baseUrl: string,
  email: string,
  password: string
) {
  let apiUrl = `${baseUrl}authen/email/login`;
  let response = await axios.post(apiUrl, { email, password });
  return response.data;
}

async function apiLoginWithGmail(baseUrl: string, email: string) {
  let apiUrl = `${baseUrl}authen/google/login`;
  let response = await axios.post(apiUrl, { email });
  return response.data;
}

describe("Test Login API", () => {
  let baseUrl: string;

  beforeAll(() => {
    baseUrl = `http://localhost:${env.PORT}/`;
  });

  it("Base url should be localhost:5000", () => {
    expect(baseUrl).toBe("http://localhost:5000/");
  });

  it("Server should respond `pong`", async () => {
    let response = await ping(baseUrl);
    expect(response).toBe("pong");
  });

  it("Should login with email and password successfully", async () => {
    let email = "admin179759@admin.com";
    let password = "123456";
    let response = await apiLoginWithEmail(baseUrl, email, password);
    expect(response.code).toBe(1101);
  });

  it("Should login with gmail successfully", async () => {
    let email = "jenwitkmonz@gmail.com";
    let response = await apiLoginWithGmail(baseUrl, email);
    expect(response.code).toBe(1101);
  });
});
