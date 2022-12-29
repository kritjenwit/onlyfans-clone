import axios from "axios";
import { env } from "../../src/config";

async function ping(baseUrl: string) {
  let apiUrl = `${baseUrl}/ping`;
  let response = await axios.post(apiUrl);
  return response.data;
}

async function apiRegisterWithEmail(
  baseUrl: string,
  email: string,
  password: string
) {
  let apiUrl = `${baseUrl}/authen/email/login`;
  let response = await axios.post(apiUrl, { email, password });
  return response.data;
}

describe("Test Register API", () => {
  let baseUrl: string;

  beforeAll(() => {
    baseUrl = `http://localhost:${env.PORT}`;
  });

  it("Server should respond `pong`", async () => {
    let response = await ping(baseUrl);
    expect(response).toBe("pong");
  });

  it("Should Email with email and password successfully", async () => {
    let email = "admin@admin.com";
    let password = "123456";
    let response = await apiRegisterWithEmail(baseUrl, email, password);

    expect(response).toBe({
      code: 1101,
      message: "Success",
    });
  });
});
