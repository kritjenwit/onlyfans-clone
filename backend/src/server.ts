/*
.####.##.....##.########...#######..########..########
..##..###...###.##.....##.##.....##.##.....##....##...
..##..####.####.##.....##.##.....##.##.....##....##...
..##..##.###.##.########..##.....##.########.....##...
..##..##.....##.##........##.....##.##...##......##...
..##..##.....##.##........##.....##.##....##.....##...
.####.##.....##.##.........#######..##.....##....##...
*/
import os from "os";
import cluster from "cluster";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { sequelize } from "./databases";

import { env, ENVIRONMENT } from "./config";
import { authenRouter } from "./routes/authen";

/*
.########.##....##.########..########
....##.....##..##..##.....##.##......
....##......####...##.....##.##......
....##.......##....########..######..
....##.......##....##........##......
....##.......##....##........##......
....##.......##....##........########
*/

/*
..######...#######..##....##..######..########
.##....##.##.....##.###...##.##....##....##...
.##.......##.....##.####..##.##..........##...
.##.......##.....##.##.##.##..######.....##...
.##.......##.....##.##..####.......##....##...
.##....##.##.....##.##...###.##....##....##...
..######...#######..##....##..######.....##...
*/
const app = express();
const clusterWorkerSize =
  ENVIRONMENT === "development" ? 2 : Math.floor(os.cpus().length / 2);
const PORT = env.PORT;

/*
.##.....##....###....########.
.##.....##...##.##...##.....##
.##.....##..##...##..##.....##
.##.....##.##.....##.########.
..##...##..#########.##...##..
...##.##...##.....##.##....##.
....###....##.....##.##.....##
*/

/*
.##.....##.####.########..########..##.......########.##......##....###....########..########
.###...###..##..##.....##.##.....##.##.......##.......##..##..##...##.##...##.....##.##......
.####.####..##..##.....##.##.....##.##.......##.......##..##..##..##...##..##.....##.##......
.##.###.##..##..##.....##.##.....##.##.......######...##..##..##.##.....##.########..######..
.##.....##..##..##.....##.##.....##.##.......##.......##..##..##.#########.##...##...##......
.##.....##..##..##.....##.##.....##.##.......##.......##..##..##.##.....##.##....##..##......
.##.....##.####.########..########..########.########..###..###..##.....##.##.....##.########
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: ["GET", "POST"],
  })
);
app.use(((err, req, res, next) => {
  if (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json(err.message);
  }
  next();
}) as ErrorRequestHandler);

/*
.########...#######..##.....##.########.########.########.
.##.....##.##.....##.##.....##....##....##.......##.....##
.##.....##.##.....##.##.....##....##....##.......##.....##
.########..##.....##.##.....##....##....######...########.
.##...##...##.....##.##.....##....##....##.......##...##..
.##....##..##.....##.##.....##....##....##.......##....##.
.##.....##..#######...#######.....##....########.##.....##
*/
app.get("/", (req, res) => {
  res.send("Hello World!");
  res.end();
});

app.use("/authen", authenRouter);
/*
.####.##....##.####.########.......###....########..########.
..##..###...##..##.....##.........##.##...##.....##.##.....##
..##..####..##..##.....##........##...##..##.....##.##.....##
..##..##.##.##..##.....##.......##.....##.########..########.
..##..##..####..##.....##.......#########.##........##.......
..##..##...###..##.....##.......##.....##.##........##.......
.####.##....##.####....##.......##.....##.##........##.......
*/
const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return;
  }

  let logString = `
  Listening on port ${PORT}
  ENVIRONMENT=${ENVIRONMENT}
  `;

  app.listen(PORT, () => console.log(logString));
};

if (clusterWorkerSize > 1) {
  if (cluster.isPrimary) {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }

    cluster.on("exit", function (worker, code, signal) {
      console.log("Worker", worker.id, "has exited with signal", signal);
    });
  } else {
    main();
  }
} else {
  main();
}