import { FastifyInstance } from "fastify";
import { userRoutes } from "./modules/users/users.route";

export const routes = async (server: FastifyInstance) => {
  server.register(userRoutes, { prefix: "/api/users" });
};
