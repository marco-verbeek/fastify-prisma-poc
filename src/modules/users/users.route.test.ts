import { describe, expect, it, test } from "vitest";
import { server } from "../../app";

test("health check", async () => {
  const response = await server.inject({
    method: "GET",
    url: "/health",
  });

  expect(response.statusCode).toBe(200);
});

describe("User registration", () => {
  it("should allow a user to register", async () => {
    const email = "test@project.com";
    const username = "test-username";

    const response = await server.inject({
      method: "POST",
      url: "/api/auth/register",
      payload: {
        email,
        username,
        password: "test-password",
      },
    });

    expect(response.statusCode).toBe(201);

    const body = JSON.parse(response.body);
    expect(body.id).toBeDefined();
    expect(body.email).toBe(email);
    expect(body.username).toBe(username);
  });
});
