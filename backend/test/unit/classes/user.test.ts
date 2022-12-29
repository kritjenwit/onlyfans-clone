import User, { LoginEmailInterface } from "../../../src/classes/User";
import { DEFAULT_PLATFORM, DEFAULT_TYPE } from "../../../src/config";
import { RESPONSE } from "../../../src/constants/response";
import { ProcJsonResult } from "../../../src/databases";

const code500 = RESPONSE.NUMBER_CODE[500];
const code400 = RESPONSE.NUMBER_CODE[400];

describe("Test User classes", () => {
  let user: User;
  let validEmail = `admin${Math.floor(Math.random() * 999999) + 1}@admin.com`;
  let invalidEmail = "test@test.com";

  beforeEach(() => {
    user = new User();
  });

  it("Test constructor", () => {
    expect(user).toBeInstanceOf(User);
    expect(user).toBeInstanceOf(Object);
    expect(user.sql).toBe("");
  });

  test("if sql is empty, it should return error field", async () => {
    user.sql = "";
    let result = await user.__process();
    expect(result).toStrictEqual({
      dno: code400.CODE,
      proc_message: code400.MESSAGE_LIST.EMPTY.SQL,
      datajson: "[]",
    });
  });

  test("if sql is error, it should return error field", async () => {
    user.sql = "select 1 where";
    let result = await user.__process();
    expect(result).toStrictEqual({
      dno: code500.CODE,
      proc_message: code500.MESSAGE_LIST.ERROR.DB,
      datajson: "[]",
    });
  });

  it("Test function registerEmail()", async () => {
    let result: ProcJsonResult;
    result = await user.registerEmail({
      app_id: 1,
      platform: DEFAULT_PLATFORM,
      type: DEFAULT_TYPE,
      ip_address: "127.0.0.1",
      email: validEmail,
      password: "123456",
    });
    return expect(result.dno).toBe(1101);
  });

  describe("Test valid loginEmail()", () => {
    test("result is valid", async () => {
      let result;
      let validParam: LoginEmailInterface;
      let invalidParam: LoginEmailInterface;
      // Test if funtion return success code
      validParam = {
        app_id: 1,
        type: "i1",
        email: validEmail,
        password: "123456",
      };
      result = await user.loginEmail(validParam);
      expect(result.dno).toBe(1101);
    });
  });

  describe("Test invalid loginEmail()", () => {
    test("result code => 401 | Empty email data", async () => {
      let result: ProcJsonResult;
      let validParam: LoginEmailInterface;
      let invalidParam: LoginEmailInterface;
      // Test if funtion return failed code
      invalidParam = {
        app_id: 1,
        type: "i1",
        email: "",
        password: "123456",
      };
      result = await user.loginEmail(invalidParam);
      expect(result.dno).not.toBe(1101);
      expect(result.dno).toBe(401);
    });

    test("result code => 201 | App ID is not in Database", async () => {
      let result: ProcJsonResult;
      let validParam: LoginEmailInterface;
      let invalidParam: LoginEmailInterface;
      // Test if funtion return failed code
      invalidParam = {
        app_id: 0,
        type: "i1",
        email: validEmail,
        password: "123456",
      };
      result = await user.loginEmail(invalidParam);
      expect(result.dno).not.toBe(1101);
      expect(result.dno).toBe(201);
    });

    test("result code => 402 | Password is empty", async () => {
      let result: ProcJsonResult;
      let validParam: LoginEmailInterface;
      let invalidParam: LoginEmailInterface;
      // Test if funtion return failed code
      invalidParam = {
        app_id: 1,
        type: "i1",
        email: validEmail,
        password: "",
      };
      result = await user.loginEmail(invalidParam);
      expect(result.dno).not.toBe(1101);
      expect(result.dno).toBe(402);
    });
  });
});
