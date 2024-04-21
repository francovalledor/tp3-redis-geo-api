import { createClient } from "redis";

const redisClient = createClient({ url: "redis://redis:6379" });

redisClient.on("error", (err) => {
  console.error("Error connecting to redis:", err);
});

redisClient.on("connect", () => {
  console.log("Redis connected successfully ⚡️");
});

export default redisClient;
