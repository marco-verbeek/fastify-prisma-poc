import * as dotenv from "dotenv";
import Fastify from "fastify";

dotenv.config();
const server = Fastify({ logger: { transport: { target: "pino-pretty" } } });

const main = async () => {
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
