// const BASE_URL = "http://localhost:3000";

async function apiRegisterWithEmail(email: string, password: string) {
  let apiUrl = `${BASE_URL}/authen/email/login`;
  let response = await axios.post(apiUrl, { email, password });
  return response.data;
}

describe("Test Register API", () => {
  it("Server should respond `pong`", async () => {
    let response = await ping();
    expect(response).toBe("pong");
  });

  it("Should Email with email and password successfully", async () => {
    let email = "admin@admin.com";
    let password = "123456";
    let response = await apiRegisterWithEmail(email, password);

    expect(response).toBe({
      code: 1101,
      message: "Success",
    });
  });
});
