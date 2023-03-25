import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  listUsersHandler,
  loginUserHandler
} from "./users.controller";
import { $ref } from "./users.schema";

export const userRoutes = async (server: FastifyInstance) => {
  server.get(
    "/users",
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          200: $ref("listAllUsersResponseSchema"),
        },
      },
    },
    listUsersHandler
  );

  server.post(
    "/register",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    createUserHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginUserSchema"),
        response: {
          200: $ref("loginUserResponseSchema"),
        },
      },
    },
    loginUserHandler
  );
};
