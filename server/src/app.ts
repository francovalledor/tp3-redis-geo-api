import "express-async-errors";
import express from "express";
import redisClient from "./redisClient";
import { router as mandalorianRouter } from "./mandalorian/router";
import { errorHandler } from "./errorHandler";
import { disableCorsMiddleware } from "./disableCorsMiddleware";

const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.use(disableCorsMiddleware);

app.use("/the-mandalorian", mandalorianRouter);
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
