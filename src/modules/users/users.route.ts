import { FastifyInstance } from "fastify";
import { createUserHandler } from "./users.controller";

export const userRoutes = async (server: FastifyInstance) => {
  server.post("/", createUserHandler);
};
