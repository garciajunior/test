const bcrypt = require("bcryptjs");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });
  it("should encrypt user password", async () => {
    const user = await User.create({
      name: "John",
      email: "john@exemplo.com",
      password: "password",
    });

    const comparedHash = await bcrypt.compare("password", user.password_hash);
    expect(comparedHash).toBe(true);
  });
});
