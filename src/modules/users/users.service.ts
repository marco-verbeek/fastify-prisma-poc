import * as argon2 from "argon2";
import prisma from "../../core/prisma";
import { CreateUserInput } from "./users.schema";

export const createUser = async (input: CreateUserInput) => {
  const { password, ...data } = input;
  const hashedPassword = await argon2.hash(password);

  const user = await prisma.user.create({
    data: {
      ...data,
      hashedPassword,
    },
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  return argon2.verify(hashedPassword, password);
};

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
    },
  });
};
