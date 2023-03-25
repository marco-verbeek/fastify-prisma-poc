import { FastifyInstance } from "fastify";
import { userSchemas } from "../modules/users/users.schema";

export const registerSchemas = async (server: FastifyInstance) => {
  const schemas = [...userSchemas];

  for (const schema of schemas) {
    server.addSchema(schema);
  }
};
