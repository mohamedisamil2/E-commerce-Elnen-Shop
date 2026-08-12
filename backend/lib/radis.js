import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const radis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 1,
  connectTimeout: 5000,
  lazyConnect: false,
});
radis.on("connect", () => {
  console.log("✅ Redis Connected");
});

radis.on("ready", () => {
  console.log("✅ Redis Ready");
});

radis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});
