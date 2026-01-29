const { UsersClient } = require("../../helpers/apiClients/index.js")

describe("API - BFF", () => {
  describe("Create User tests", () => {
    it("user should be registered and return the correct fields", async () => {
      const username = "correct2";
      const email = "correct2@user.com";
      const password = "ASDF123asdf";

      const response = await UsersClient.createUser(username, email, password);
      const { data } = response;

      expect(data.username).toBe(username);
      expect(data.token).toEqual(expect.any(String));
      expect(data.token).not.toContain(".");
      expect(typeof data.storage.id).toEqual("string");
      expect(typeof data.stats.id).toEqual("string");
      expect(data.password).toBeUndefined();
      expect(data.stats.elo).toEqual(10000);
      expect(data.stats.money).toEqual(100000);
    });

    it("should return error when the user name is already registered", async () => {
      const username = "correct2";
      const email = "example2@gmail.com";
      const password = "ASDF123asdf";

      const response = await UsersClient.createUser(username, email, password);
      const { data } = response;

      expect(response.status).toBe(409);
      expect(data.message).toBe("Name is already in use - CRUD");
    });

    it("should return error when the user email is already registered", async () => {
      const username = "example1";
      const email = "correct2@user.com";
      const password = "ASDF123asdf";

      const response = await UsersClient.createUser(username, email, password);
      const { data } = response;

      expect(response.status).toBe(409);
      expect(data.message).toBe("Email is already in use - CRUD");
    });

    it("should return error when the password doesn't have uppercase", async () => {
      const username = "example2";
      const email = "example@gmail.com";
      const password = "asdfasdfasdf123";

      const response = await UsersClient.createUser(username, email, password);
      const { data } = response;

      expect(response.status).toBe(400);
      expect(data.message).toBe(
        "Invalid Password"
      );
    });

    it("should return error when the password doesn't have lowercase", async () => {
      const username = "example2";
      const email = "example@gmail.com";
      const password = "ASDJKLHSAK123";

      const response = await UsersClient.createUser(username, email, password);
      const { data } = response;

      expect(response.status).toBe(400);
      expect(data.message).toBe(
        "Invalid Password"
      );
    });

    it("should return error when the password doesn't have numbers", async () => {
      const username = "example2";
      const email = "example@gmail.com";
      const password = "ASDJKLHSAKasdfasdfadf";

      const response = await UsersClient.createUser(username, email, password);
      const { data } = response;

      expect(response.status).toBe(400);
      expect(data.message).toBe(
        "Invalid Password"
      );
    });
  });
});
