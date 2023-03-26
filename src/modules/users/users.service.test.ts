import * as argon2 from "argon2";
import { beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "../../core/__mocks__/prisma";
import { CreateUserInput } from "./users.schema";
import * as UsersService from "./users.service";

vi.mock("../../core/prisma");
vi.mock("argon2");

describe("users.service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("createUser", () => {
    it("should return the created user", async () => {
      const newUser: CreateUserInput = {
        email: "user@test.be",
        username: "test-user",
        password: "test-password",
      };

      await UsersService.createUser(newUser);

      expect(argon2.hash).toHaveBeenCalledWith(newUser.password);
      expect(prisma.user.create).toHaveBeenCalledOnce();
    });
  });
});
