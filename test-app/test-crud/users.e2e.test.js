// tests/users.e2e.test.js

const { CRUD_URL } = require("../config");

async function createUser(name, email, password) {
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
}

describe("API - CRUD", () => {
  describe("Create User tests", () => {
    it("user should be registered and return the correct fields", async () => {
      const response = await createUser(
        "correct",
        "correct@user.com",
        "ASDF123asdf"
      );

      const { data } = response;

      expect(data.id).toEqual(expect.any(String));
      expect(data.name).toBe("correct");
      expect(data.email).toBe("correct@user.com");
      expect(data.has_game).toBe(false);

      expect(data.password).toBeUndefined();
    });

    it("should return error when the user name is already registered", async () => {
      const response = await createUser(
        "correct",
        "example1@gmail.com",
        "ASDF123asdf"
      );

      const { data } = response;

      expect(data.error).toBe("Bad Request");
      expect(data.statusCode).toBe(400);
      expect(data.message).toBe("Name is already in use - CRUD");
    });

    it("should return error when the user email is already registered", async () => {
      const response = await createUser(
        "example1",
        "correct@user.com",
        "ASDF123asdf"
      );

      const { data } = response;

      expect(data.error).toBe("Bad Request");
      expect(data.statusCode).toBe(400);
      expect(data.message).toBe("Email is already in use - CRUD");
    });

    it("should return error when the password don't have uppercase", async () => {
      const response = await createUser(
        "exaple2",
        "example@gmail.com",
        "asdfasdfasdf123"
      );

      const { data } = response;

      expect(data.message).toBe(
        "The password must be at least 8 characters long, include uppercase, lowercase and a number. - CRUD"
      );
      expect(data.error).toBe("Bad Request");
      expect(data.statusCode).toBe(400);
    });

    it("should return error when the password don't have lowercase", async () => {
      const response = await createUser(
        "exaple2",
        "example@gmail.com",
        "ASDJKLHSAK123"
      );

      const { data } = response;

      expect(data.message).toBe(
        "The password must be at least 8 characters long, include uppercase, lowercase and a number. - CRUD"
      );
      expect(data.error).toBe("Bad Request");
      expect(data.statusCode).toBe(400);
    });

    it("should return error when the password don't have numbers", async () => {
      const response = await createUser(
        "exaple2",
        "example@gmail.com",
        "ASDJKLHSAKasdfasdfadf"
      );

      const { data } = response;

      expect(data.message).toBe(
        "The password must be at least 8 characters long, include uppercase, lowercase and a number. - CRUD"
      );
      expect(data.error).toBe("Bad Request");
      expect(data.statusCode).toBe(400);
    });
  });
});
