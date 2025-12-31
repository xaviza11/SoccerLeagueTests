// tests/users.e2e.test.js

const { BFF_URL } = require("../../config");

/* =====================
   Helpers
===================== */

const createUser = async (name, email, password) => {
  const response = await fetch(`${BFF_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  return {
    status: response.status,
    data,
  };
};

/* =====================
   Tests
===================== */

describe("API - BFF", () => {
  describe("Create User tests", () => {
    it("user should be registered and return the correct fields", async () => {
      const username = "correct2";
      const email = "correct2@user.com";
      const password = "ASDF123asdf";

      const response = await createUser(username, email, password);
      const { data } = response;

      expect(data.username).toBe(username);
      expect(data.token).toEqual(expect.any(String));
      expect(data.token).not.toContain(".");
    });

    it("should return error when the user name is already registered", async () => {
      const username = "correct2";
      const email = "example2@gmail.com";
      const password = "ASDF123asdf";

      const response = await createUser(username, email, password);
      const { data } = response;

      expect(data.error).toBe("Conflict");
      expect(data.statusCode).toBe(409);
      expect(data.message).toBe("Name is already in use - CRUD");
    });

    it("should return error when the user email is already registered", async () => {
      const username = "example1";
      const email = "correct2@user.com";
      const password = "ASDF123asdf";

      const response = await createUser(username, email, password);
      const { data } = response;

      expect(data.error).toBe("Conflict");
      expect(data.statusCode).toBe(409);
      expect(data.message).toBe("Email is already in use - CRUD");
    });

    it("should return error when the password doesn't have uppercase", async () => {
      const username = "example2";
      const email = "example@gmail.com";
      const password = "asdfasdfasdf123";

      const response = await createUser(username, email, password);
      const { data } = response;

      expect(data.error).toBe("Conflict");
      expect(data.statusCode).toBe(409);
      expect(data.message).toBe(
        "The password must be at least 8 characters long, include uppercase, lowercase and a number. - CRUD"
      );
    });

    it("should return error when the password doesn't have lowercase", async () => {
      const username = "example2";
      const email = "example@gmail.com";
      const password = "ASDJKLHSAK123";

      const response = await createUser(username, email, password);
      const { data } = response;

      expect(data.error).toBe("Conflict");
      expect(data.statusCode).toBe(409);
      expect(data.message).toBe(
        "The password must be at least 8 characters long, include uppercase, lowercase and a number. - CRUD"
      );
    });

    it("should return error when the password doesn't have numbers", async () => {
      const username = "example2";
      const email = "example@gmail.com";
      const password = "ASDJKLHSAKasdfasdfadf";

      const response = await createUser(username, email, password);
      const { data } = response;

      expect(data.error).toBe("Conflict");
      expect(data.statusCode).toBe(409);
      expect(data.message).toBe(
        "The password must be at least 8 characters long, include uppercase, lowercase and a number. - CRUD"
      );
    });
  });
});
