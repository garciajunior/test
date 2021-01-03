const request = require("supertest");
const app = require("../../src/app");
const factory = require("../factories");

// const { User } = require("../../src/app/models");
const truncate = require("../../__teste__/utils/truncate");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should receive JWT  token when valid credencial was given", async () => {
    const user = await factory.create("User", {
      password: "password",
    });

    const response = await request(app)
      .post("/sessions")
      .send({ email: user.email, password_hash: user.password_hash });

    expect(response.status).toBe(200);
  });

  it("should not Authenticade  with invalid credencials", async () => {
    const user = await factory.create("User", {
      password: "passw777",
    });

    const response = await request(app)
      .post("/sessions")
      .send({ email: user.email, password: "12356897" });

    expect(response.status).toBe(401);
  });
  it("should return a jwt when authenticated", async () => {
    const user = await factory.create("User", {
      password: "password",
    });
    const response = await request(app)
      .post("/sessions")
      .send({ email: user.email, password: "password" });
    expect(response.body).toHaveProperty("token");
  });

  it("should able to acces private routes when is authenticated", async () => {
    const user = await factory.create("User", {
      password: "password",
    });

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    console.log(user.generateToken());
    expect(response.status).toBe(200);
  });

  it("should not able to acces private routes when is  not authenticated", async () => {
    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  });
  it("should not able to acces private routes with jwt  token is invalid", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer 123355555`);

    expect(response.status).toBe(401);
  });
});
