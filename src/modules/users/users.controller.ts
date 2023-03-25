import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../../app";
import { CreateUserInput, LoginUserInput } from "./users.schema";
import {
  createUser,
  doesPasswordMatch,
  findUserByEmail,
  getAllUsers,
} from "./users.service";

export const createUserHandler = async (
  req: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  const body = req.body;

  try {
    const existingUser = await findUserByEmail(body.email);
    if (existingUser) {
      return reply.code(409).send();
    }

    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send();
  }
};

export const loginUserHandler = async (
  req: FastifyRequest<{
    Body: LoginUserInput;
  }>,
  reply: FastifyReply
) => {
  const body = req.body;

  try {
    const user = await findUserByEmail(body.email);
    if (!user) {
      return reply.code(401).send({
        message: "Invalid email or password",
      });
    }

    // TODO: rename
    const isPasswordCorrect = await doesPasswordMatch(
      body.password,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      return reply.code(401).send({
        message: "Invalid email or password",
      });
    }

    const { hashedPassword, ...data } = user;
    return reply.code(200).send({ accessToken: server.jwt.sign(data) });
  } catch (err) {
    // TODO: handle error
    return reply.code(500).send();
  }
};

export const listUsersHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await getAllUsers();

    return reply.code(200).send(users);
  } catch (err) {
    return reply.code(500).send();
  }
};
