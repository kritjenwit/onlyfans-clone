import {
  LOGIN_WITH,
  REGISTER_WITH,
} from "../../../src/constants/database_procedure";
import {
  beautifyDBResult,
  buildProcedureQuery,
  buildProcedureQueryByType,
} from "../../../src/utils/buildProcedureQuery";

describe("To test buildProcedureQuery function", () => {
  describe("if pass all correct parameter it should return correct procedure query", () => {
    test(`pass proc_account as procName and it shoud return "call proc_account"`, () => {
      let sql = buildProcedureQuery("proc_account", {
        type: "TEST",
      });
      expect(sql).toMatch(/call proc_account/);
    });

    test(`pass proc_wallet as procName and it shoud return "call proc_wallet"`, () => {
      let sql = buildProcedureQuery("proc_wallet", {
        type: "TEST",
      });
      expect(sql).toMatch(/call proc_wallet/);
    });
  });

  describe("if pass incorrect parameter it should return null as result", () => {
    test(`pass "empty string" as procName`, () => {
      let sql = buildProcedureQuery("", {
        type: "TEST",
      });
      expect(sql).toBe("");
    });
    test(`pass "null" as procName`, () => {
      let sql = buildProcedureQuery("", {
        type: "TEST",
      });
      expect(sql).toBe("");
    });
    test(`pass "empty object" as values`, () => {
      let sql = buildProcedureQuery("proc_account", {});
      expect(sql).toBe("");
    });
    test(`pass "empty array" as values`, () => {
      let sql = buildProcedureQuery("proc_account", []);
      expect(sql).toBe("");
    });
    test(`pass "string" as values`, () => {
      let sql = buildProcedureQuery("proc_account", "TEST");
      expect(sql).toBe("");
    });
    test(`pass "number" as values`, () => {
      let sql = buildProcedureQuery("proc_account", 1234);
      expect(sql).toBe("");
    });
    test(`pass "NaN" as values`, () => {
      let sql = buildProcedureQuery("proc_account", NaN);
      expect(sql).toBe("");
    });
  });
});

describe("To test buildProcedureQueryByType function", () => {
  describe("if pass correct type, it should return correct sql", () => {
    test(`pass "LOGIN_WITH.EMAIL" as type and should return 'call proc_account('{\"process_type\":1'`, () => {
      let sql = buildProcedureQueryByType(LOGIN_WITH.EMAIL, {
        type: "TEST",
      });
      let pattern = new RegExp(`"process_type\":1`, "i");
      expect(sql).toMatch(pattern);
    });
    test(`pass "LOGIN_WITH.GOOGLE" as type and should return 'call proc_account('{\"process_type\":3'`, () => {
      let sql = buildProcedureQueryByType(LOGIN_WITH.GOOGLE, {
        type: "TEST",
      });
      let pattern = new RegExp(`"process_type\":3`, "i");
      expect(sql).toMatch(pattern);
    });
    test(`pass "REGISTER_WITH.EMAIL" as type and should return 'call proc_account('{\"process_type\":2'`, () => {
      let sql = buildProcedureQueryByType(REGISTER_WITH.EMAIL, {
        type: "TEST",
      });
      let pattern = new RegExp(`"process_type\":2`, "i");
      expect(sql).toMatch(pattern);
    });
  });

  describe("if pass incorrect type, it should return empty string", () => {
    test(`pass "empty string" as type`, () => {
      let sql = buildProcedureQueryByType("", {
        type: "TEST",
      });
      expect(sql).toBe("");
    });
    test(`pass "Not in a LIST" as type`, () => {
      let sql = buildProcedureQueryByType("asd", {
        type: "TEST",
      });
      expect(sql).toBe("");
    });
  });
});

describe("To test beautifyDBResult function", () => {
  describe("if pass correct result, it should return correct object", () => {
    test("pass correct result", () => {
      let result = beautifyDBResult({
        dno: 500,
        proc_message: "TEST",
        datajson: JSON.stringify({ any: "data" }),
      });

      expect(result).toStrictEqual({
        code: 500,
        message: "TEST",
        data: { any: "data" },
      });
    });
  });
});
