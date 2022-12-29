import {
  LOGIN_WITH,
  REGISTER_WITH,
  PROC_ACCOUNT,
} from "../constants/database_procedure";
import { ProcJsonResult } from "../databases";

interface ProcedureObject {
  [key: string]: string | number | boolean;
}

export const buildProcedureQuery = (
  procedureName: string,
  values: any
): string  => {
  let jsonValues = JSON.stringify(values);
  if (procedureName == "") {
    return '';
  }
  if (typeof values !== "object" || Object.keys(values).length <= 0) {
    return '';
  }

  return `call ${procedureName}('${jsonValues}'::json, 0::integer,''::character varying, ''::character varying)`;
};

export const buildProcedureQueryByType = (
  type: string,
  values: object
): string => {
  let procName = "";
  let procType = 0;
  if (type === LOGIN_WITH.EMAIL) {
    procName = PROC_ACCOUNT.NAME;
    procType = PROC_ACCOUNT.TYPE.LOGIN;
  } else if (type == LOGIN_WITH.GOOGLE) {
    procName = PROC_ACCOUNT.NAME;
    procType = PROC_ACCOUNT.TYPE.LOGIN_WITH_GOOGLE;
  } else if (type == REGISTER_WITH.EMAIL) {
    procName = PROC_ACCOUNT.NAME;
    procType = PROC_ACCOUNT.TYPE.REGISTER;
  } else {
    return "";
  }

  let jsonValues = {
    process_type: procType,
    ...values,
  };

  return buildProcedureQuery(procName, jsonValues)
};

/**
 *
 * @param {ProcJsonResult} result Result from Database query
 * @returns {Object} beautified result
 */
export const beautifyDBResult = (result: ProcJsonResult): object => {
  return {
    code: result.dno,
    message: result.proc_message,
    data: JSON.parse(result.datajson),
  };
};
