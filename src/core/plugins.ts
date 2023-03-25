import fastifyHelmet from "@fastify/helmet";
import fastifyJwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";

export const registerPlugins = (server: FastifyInstance) => {
  server.register(fastifyHelmet);

  server.register(fastifyJwt, {
    secret: "notsosecretsochangeme",
  });
};
