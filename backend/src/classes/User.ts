import { QueryTypes } from "sequelize";
import { LOGIN_WITH, REGISTER_WITH } from "../constants/database_procedure";
import { RESPONSE } from "../constants/response";
import { ProcJsonResult, sequelize } from "../databases";
import { buildProcedureQueryByType } from "../utils/buildProcedureQuery";

export interface LoginEmailInterface {
  app_id: number;
  email: string;
  type: string;
  password: string;
}

export interface LoginGoogleInterface {
  app_id: number;
  email: string;
  platform: string;

  type: string;
  ip_address: string;
}

export interface RegisterEmailInterface {
  app_id: number;
  platform: string;
  type: string;
  email: string;
  password: string;
  ip_address: string;
}

const code500 = RESPONSE.NUMBER_CODE[500];

export default class User {
  sql: string;

  constructor() {
    this.sql = "";
  }

  async __process(): Promise<ProcJsonResult> {
    try {
      let dbResult = await sequelize.query<ProcJsonResult>(this.sql, {
        type: QueryTypes.SELECT,
      });
      return dbResult[0];
    } catch (error) {
      return {
        dno: code500.CODE,
        proc_message: code500.MESSAGE_LIST.ERROR.DB,
        datajson: "[]",
      };
    }
  }

  async loginEmail(data: LoginEmailInterface) {
    this.sql = buildProcedureQueryByType(LOGIN_WITH.EMAIL, data);
    return this.__process();
  }

  async loginGoogle(data: LoginGoogleInterface) {
    this.sql = buildProcedureQueryByType(LOGIN_WITH.GOOGLE, data);
    return this.__process();
  }

  async registerEmail(data: RegisterEmailInterface) {
    this.sql = buildProcedureQueryByType(REGISTER_WITH.EMAIL, data);
    return this.__process();
  }
}
