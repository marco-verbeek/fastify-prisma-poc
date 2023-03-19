import * as dotenv from "dotenv";
import Fastify from "fastify";
import { routes } from "./routes";

dotenv.config();
const server = Fastify({
  logger: { level: "info", transport: { target: "pino-pretty" } },
});

server.get("/health", async () => {
  return { status: "OK" };
});

const main = async () => {
  server.register(routes);

  try {
    await server.listen({
      port: Number(process.env.PORT) || 3000,
      host: "0.0.0.0",
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
