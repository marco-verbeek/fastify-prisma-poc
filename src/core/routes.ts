import { FastifyInstance } from "fastify";
import { userRoutes } from "../modules/users/users.route";

export const routes = async (server: FastifyInstance) => {
  // Health check
  server.get("/health", async () => {
    return { status: "OK" };
  });

  server.register(userRoutes, { prefix: "/api/auth" });
};
