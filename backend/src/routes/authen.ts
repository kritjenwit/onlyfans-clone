/*
.####.##.....##.########...#######..########..########
..##..###...###.##.....##.##.....##.##.....##....##...
..##..####.####.##.....##.##.....##.##.....##....##...
..##..##.###.##.########..##.....##.########.....##...
..##..##.....##.##........##.....##.##...##......##...
..##..##.....##.##........##.....##.##....##.....##...
.####.##.....##.##.........#######..##.....##....##...
*/
import { Router, json } from "express";
import cors from "cors";

import User from "../classes/User";
import { DEFAULT_PLATFORM, LOGIN_TYPE, APP_ID } from "../config";
import { beautifyDBResult } from "../utils/buildProcedureQuery";
import { RESPONSE } from "../constants/response";

/*
.####.##....##.########.########.########..########....###.....######..########
..##..###...##....##....##.......##.....##.##.........##.##...##....##.##......
..##..####..##....##....##.......##.....##.##........##...##..##.......##......
..##..##.##.##....##....######...########..######...##.....##.##.......######..
..##..##..####....##....##.......##...##...##.......#########.##.......##......
..##..##...###....##....##.......##....##..##.......##.....##.##....##.##......
.####.##....##....##....########.##.....##.##.......##.....##..######..########
*/
interface RequestEmailLogin {
  email: string;
  password: string;
}
interface RequestEmailRegsiter {
  email: string;
  password: string;
  confirmPassword: string;
}

/*
..######...#######..##....##..######..########
.##....##.##.....##.###...##.##....##....##...
.##.......##.....##.####..##.##..........##...
.##.......##.....##.##.##.##..######.....##...
.##.......##.....##.##..####.......##....##...
.##....##.##.....##.##...###.##....##....##...
..######...#######..##....##..######.....##...
*/
export const authenRouter = Router();
const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
  origin: allowedOrigins,
};
const user = new User();
const code400 = RESPONSE.NUMBER_CODE[400];
/*
.##.....##....###....########.
.##.....##...##.##...##.....##
.##.....##..##...##..##.....##
.##.....##.##.....##.########.
..##...##..#########.##...##..
...##.##...##.....##.##....##.
....###....##.....##.##.....##
*/
let sql: string;
let params: string[];

/*
.##.....##.####.########..########..##.......########.##......##....###....########..########
.###...###..##..##.....##.##.....##.##.......##.......##..##..##...##.##...##.....##.##......
.####.####..##..##.....##.##.....##.##.......##.......##..##..##..##...##..##.....##.##......
.##.###.##..##..##.....##.##.....##.##.......######...##..##..##.##.....##.########..######..
.##.....##..##..##.....##.##.....##.##.......##.......##..##..##.#########.##...##...##......
.##.....##..##..##.....##.##.....##.##.......##.......##..##..##.##.....##.##....##..##......
.##.....##.####.########..########..########.########..###..###..##.....##.##.....##.########
*/
authenRouter.use(cors(corsOptions));
authenRouter.use(json());
authenRouter.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

/*
.########...#######..##.....##.########.########.########.
.##.....##.##.....##.##.....##....##....##.......##.....##
.##.....##.##.....##.##.....##....##....##.......##.....##
.########..##.....##.##.....##....##....######...########.
.##...##...##.....##.##.....##....##....##.......##...##..
.##....##..##.....##.##.....##....##....##.......##....##.
.##.....##..#######...#######.....##....########.##.....##
*/
authenRouter.get("/", (req, res) => {
  res.send("Authen /");
  res.end();
});

/*
.##........#######...######...####.##....##
.##.......##.....##.##....##...##..###...##
.##.......##.....##.##.........##..####..##
.##.......##.....##.##...####..##..##.##.##
.##.......##.....##.##....##...##..##..####
.##.......##.....##.##....##...##..##...###
.########..#######...######...####.##....##
*/
authenRouter.post("/email/login", async (req, res) => {
  let body = req.body as RequestEmailLogin;
  let email = body.email;
  let password = body.password;

  if (!email) {
    res.status(code400.CODE).json({
      message: code400.MESSAGE_LIST.REQUIRED.EMAIL,
    });
    res.end();
    return;
  }
  if (!password) {
    res.status(code400.CODE).json({
      message: code400.MESSAGE_LIST.REQUIRED.PASSWORD,
    });
    res.end();
    return;
  }

  if (email.includes("@") === false) {
    res.status(code400.CODE).json({
      message: code400.MESSAGE_LIST.INVALID.EMAIL,
    });
    res.end();
    return;
  }

  let loginResult = await user.loginEmail({
    app_id: APP_ID.MAIN,
    type: LOGIN_TYPE.EMAIL,
    email: email,
    password: password,
  });

  res.status(200).json(beautifyDBResult(loginResult));
  res.end();
  return;
});

/*
..######....#######...#######...######...##.......########
.##....##..##.....##.##.....##.##....##..##.......##......
.##........##.....##.##.....##.##........##.......##......
.##...####.##.....##.##.....##.##...####.##.......######..
.##....##..##.....##.##.....##.##....##..##.......##......
.##....##..##.....##.##.....##.##....##..##.......##......
..######....#######...#######...######...########.########
*/
authenRouter.post("/google/login", async (req, res) => {
  let body = req.body as RequestEmailLogin;
  let email = body.email;
  let password = body.password;

  if (!email) {
    res.status(code400.CODE).json({
      message: code400.MESSAGE_LIST.REQUIRED.EMAIL,
    });
    res.end();
    return;
  }

  if (email.includes("@") === false) {
    res.status(code400.CODE).json({
      message: code400.MESSAGE_LIST.INVALID.EMAIL,
    });
    res.end();
    return;
  }

  if (!password) {
    res.status(code400.CODE).json({
      message: code400.MESSAGE_LIST.INVALID.PASSWORD,
    });
    res.end();
    return;
  }

  let loginResult = await user.loginGoogle({
    app_id: APP_ID.MAIN,
    type: LOGIN_TYPE.GOOGLE,
    email: email,
    password: password,
    platform: DEFAULT_PLATFORM,
    ip_address: req.ip,
  });

  res.status(200).json(beautifyDBResult(loginResult));
  res.end();
  return;
});

/*
.########..########..######...####..######..########.########.########.
.##.....##.##.......##....##...##..##....##....##....##.......##.....##
.##.....##.##.......##.........##..##..........##....##.......##.....##
.########..######...##...####..##...######.....##....######...########.
.##...##...##.......##....##...##........##....##....##.......##...##..
.##....##..##.......##....##...##..##....##....##....##.......##....##.
.##.....##.########..######...####..######.....##....########.##.....##
*/
authenRouter.post("/email/register", async (req, res) => {
  let body = req.body as RequestEmailRegsiter;
  let email = body.email;
  let password = body.password;
  let confirmPassword = body.confirmPassword;

  if (!email) {
    res.status(code400.CODE).json({
      message: code400.MESSAGE_LIST.REQUIRED.EMAIL,
    });
    res.end();
    return;
  }
  if (!password) {
    res.status(code400.CODE).json({
      message: code400.MESSAGE_LIST.REQUIRED.PASSWORD,
    });
    res.end();
    return;
  }
  if (!confirmPassword) {
    res.status(code400.CODE).json({
      message: code400.MESSAGE_LIST.REQUIRED.PASSWORD,
    });
    res.end();
    return;
  }
  if (password != confirmPassword) {
    res.status(code400.CODE).json({
      message: code400.MESSAGE_LIST.MISSMATCH.PASSWORD_AND_CONFIRM_PASSWORD,
    });
    res.end();
    return;
  }

  let registerResult = await user.registerEmail({
    app_id: APP_ID.MAIN,
    platform: DEFAULT_PLATFORM,
    type: LOGIN_TYPE.EMAIL,
    email: email,
    password: password,
    ip_address: req.ip,
  });

  res.status(200).json(beautifyDBResult(registerResult));
  res.end();
  return;
});
