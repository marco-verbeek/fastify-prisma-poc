import { config } from "./core/config";
import { buildServer } from "./server";

export const server = buildServer({
  logger: true,
});

const main = async () => {
  try {
    await server.listen({
      host: config.server.host,
      port: config.server.port,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
