import "express-async-errors";
import express from "express";
import redisClient from "./redisClient";
import { router as geoRouter } from "./geo/router";
import { errorHandler } from "./errorHandler";
import { disableCorsMiddleware } from "./disableCorsMiddleware";
import bodyParser from "body-parser";

const SERVER_PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(disableCorsMiddleware);

app.use("/geo", geoRouter);
app.use(errorHandler);

const initApp = async () => {
  await redisClient.connect();

  app.listen(SERVER_PORT, () => {
    console.log(`Server ready 🤙🏽 Listening on port ${SERVER_PORT}`);
  });

  process.on("SIGINT", () => {
    redisClient.quit();
    process.exit();
  });
};

initApp();
