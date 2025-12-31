// tests/users.e2e.test.js

const { CRUD_URL } = require("../../config");

/* =====================
   Helpers
===================== */

const createUser = async (name, email, password) => {
  const response = await fetch(`${CRUD_URL}/users`, {
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

describe("API - CRUD", () => {
  describe("Create User tests", () => {
    it("user should be registered and return the correct fields", async () => {
      const name = "correct";
      const email = "correct@user.com";
      const password = "ASDF123asdf";

      const response = await createUser(name, email, password);
      const { data } = response;

      expect(data.id).toEqual(expect.any(String));
      expect(data.name).toBe(name);
      expect(data.email).toBe(email);
      expect(data.has_game).toBe(false);
      expect(data.password).toBeUndefined();
    });

    it("should return error when the user name is already registered", async () => {
      const name = "correct";
      const email = "example1@gmail.com";
      const password = "ASDF123asdf";

      const response = await createUser(name, email, password);
      const { data } = response;

      expect(data.error).toBe("Bad Request");
      expect(data.statusCode).toBe(400);
      expect(data.message).toBe("Name is already in use - CRUD");
    });

    it("should return error when the user email is already registered", async () => {
      const name = "example1";
      const email = "correct@user.com";
      const password = "ASDF123asdf";

      const response = await createUser(name, email, password);
      const { data } = response;

      expect(data.error).toBe("Bad Request");
      expect(data.statusCode).toBe(400);
      expect(data.message).toBe("Email is already in use - CRUD");
    });

    it("should return error when the password doesn't have uppercase", async () => {
      const name = "example2";
      const email = "example@gmail.com";
      const password = "asdfasdfasdf123";

      const response = await createUser(name, email, password);
      const { data } = response;

      expect(data.error).toBe("Bad Request");
      expect(data.statusCode).toBe(400);
      expect(data.message).toBe(
        "The password must be at least 8 characters long, include uppercase, lowercase and a number. - CRUD"
      );
    });

    it("should return error when the password doesn't have lowercase", async () => {
      const name = "example2";
      const email = "example@gmail.com";
      const password = "ASDJKLHSAK123";

      const response = await createUser(name, email, password);
      const { data } = response;

      expect(data.error).toBe("Bad Request");
      expect(data.statusCode).toBe(400);
      expect(data.message).toBe(
        "The password must be at least 8 characters long, include uppercase, lowercase and a number. - CRUD"
      );
    });

    it("should return error when the password doesn't have numbers", async () => {
      const name = "example2";
      const email = "example@gmail.com";
      const password = "ASDJKLHSAKasdfasdfadf";

      const response = await createUser(name, email, password);
      const { data } = response;

      expect(data.error).toBe("Bad Request");
      expect(data.statusCode).toBe(400);
      expect(data.message).toBe(
        "The password must be at least 8 characters long, include uppercase, lowercase and a number. - CRUD"
      );
    });
  });
});
