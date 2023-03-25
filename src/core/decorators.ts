import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const registerDecorators = (server: FastifyInstance) => {
  server.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (err) {
        return reply.send(err);
      }
    }
  );
};
