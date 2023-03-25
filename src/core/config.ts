import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  node_env: process.env.NODE_ENV || "development",

  server: {
    host: process.env.URL || "0.0.0.0",
    port: Number(process.env.PORT) || 3000,
  },

  database: {
    url: process.env.DATABASE_URL || "",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "",
  },
};
