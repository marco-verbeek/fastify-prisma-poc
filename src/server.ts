import Fastify from "fastify";
import { registerDecorators } from "./core/decorators";
import { registerPlugins } from "./core/plugins";
import { routes } from "./core/routes";
import { registerSchemas } from "./core/schemas";

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

export const buildServer = (opts = {}) => {
  const server = Fastify(opts);

  registerPlugins(server);
  registerDecorators(server);
  registerSchemas(server);
  server.register(routes);

  return server;
};
