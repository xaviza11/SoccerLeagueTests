const {UsersClient} = require("../helpers/apiClients/index.js")

describe("API - BFF", () => {
  describe("Login user tests", () => {
    it("should login a user", async () => {
      const username = "user1234f4";
      const email = "usercorrect@test.com";
      const password = "ASDF123adf";

      await UsersClient.createUser(username, email, password);

      const response = await UsersClient.login(email, password);
      const { data } = response;

      expect(data.username).toBe(username);
      expect(data.token).toEqual(expect.any(String));
      expect(data.token).not.toContain(".");
    });
  });

  it("should return error when the user doesn't exist", async () => {
    const email = "notExist@exist.com";
    const password = "ASDF123asdf";

    const response = await UsersClient.login(email, password);
    const { data } = response;

    expect(response.status).toBe(401);
    expect(data.message).toBe("Invalid credentials - CRUD");
  });

  it("should return error when the password is invalid", async () => {
    const email = "notExist@test.com";
    const password = "asdf";

    const response = await UsersClient.login(email, password);
    const { data } = response;

    expect(response.status).toBe(400);
    expect(data.message).toBe(
      "Invalid Password"
    );
  });

  it("should return error when the email has invalid format", async () => {
    const email = "notExist";
    const password = "asd";

    const response = await UsersClient.login(email, password);
    const { data } = response;

    expect(response.status).toBe(400);
    expect(data.message).toBe("Invalid Email");
  });
});
