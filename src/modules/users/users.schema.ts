import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const coreUserSchema = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  username: z.string().min(1),
};

const createUserSchema = z.object({
  ...coreUserSchema,
  password: z.string().min(1),
});

const createUserResponseSchema = z.object({
  id: z.string(),
  ...coreUserSchema,
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const loginUserResponseSchema = z.object({
  accessToken: z.string(),
});

const listAllUsersResponseSchema = z.array(
  z.object({
    id: z.string(),
    ...coreUserSchema,
  })
);

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginUserSchema,
  loginUserResponseSchema,
  listAllUsersResponseSchema,
});
