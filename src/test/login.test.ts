// import { rest } from "msw";
import { loginRequest } from "@/services/auth/login";
import { http, HttpResponse } from "msw";

import { setupServer } from "msw/node";
import { afterEach } from "node:test";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const server = setupServer(
  // Mock the successful login response
  http.post("https://playground.tesonet.lt/v1/tokens", async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    if (username === "validUser" && password === "validPassword") {
      return HttpResponse.json(
        { token: "mockedToken" },
        {
          status: 200,
        }
      );
    }

    // Mock invalid credentials response
    return HttpResponse.json(
      { message: "Invalid credentials" },
      {
        status: 401,
      }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("loginRequest", () => {
  it("should return a token on successful login", async () => {
    const data = { username: "validUser", password: "validPassword" };

    const response = await loginRequest(data);

    expect(response).toEqual({ token: "mockedToken" });
  });

  it("should throw an error for invalid credentials", async () => {
    const data = { username: "invalidUser", password: "wrongPassword" };

    await expect(loginRequest(data)).rejects.toThrow("Invalid credentials");
  });

  it("should throw an error if the token is missing in the response", async () => {
    server.use(
      http.post("https://playground.tesonet.lt/v1/tokens", () => {
        return HttpResponse.json(
          {},
          {
            status: 200,
          }
        ); // No token in response
      })
    );

    const data = { username: "validUser", password: "validPassword" };

    await expect(loginRequest(data)).rejects.toThrow(
      "An unexpected error occurred"
    );
  });

  it("should handle network errors gracefully", async () => {
    server.use(
      http.post("https://playground.tesonet.lt/v1/tokens", () => {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Not Found",
        });
      })
    );

    const data = { username: "validUser", password: "validPassword" };

    await expect(loginRequest(data)).rejects.toThrow("Invalid credentials");
  });
});
