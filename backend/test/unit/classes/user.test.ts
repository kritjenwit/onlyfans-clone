import User, { LoginEmailInterface } from "../../../src/classes/User";

describe("Test User classes", () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  it("Test constructor", () => {
    expect(user).toBeInstanceOf(User);
    expect(user).toBeInstanceOf(Object);
    expect(user.sql).toBe("");
  });

  it("Test function loginEmail()", async () => {
    let result;
    let validParam: LoginEmailInterface;
    let invalidParam: LoginEmailInterface;

    // Test if funtion return success code
    validParam = {
      app_id: 1,
      type: "i1",
      email: "admin@admin.com",
      password: "123456",
    };
    result = await user.loginEmail(validParam);
    expect(result.dno).toBe(1101);

    // Test if funtion return failed code
    invalidParam = {
      app_id: 1,
      type: "i1",
      email: "",
      password: "123456",
    };
    result = await user.loginEmail(invalidParam);
    expect(result.dno).not.toBe(1101);
    expect(result.dno).toBe(201);

    // Test if funtion return failed code
    invalidParam = {
      app_id: 0,
      type: "i1",
      email: "admin@admin.com",
      password: "123456",
    };
    result = await user.loginEmail(invalidParam);
    expect(result.dno).not.toBe(1101);
    expect(result.dno).toBe(201);

    // Test if funtion return failed code
    invalidParam = {
      app_id: 1,
      type: "i1",
      email: "admin@admin.com",
      password: "",
    };
    result = await user.loginEmail(invalidParam);
    expect(result.dno).not.toBe(1101);
    expect(result.dno).toBe(201);
  });

  it;
});
