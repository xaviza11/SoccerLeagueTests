// tests/users.e2e.test.js

const { CRUD_URL } = require("../../config");

/* =====================
   Utils
===================== */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const loginUser = async (email, password) => {
  const response = await fetch(`${CRUD_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
  describe("Login User tests", () => {
    it("should login a user", async () => {
      const username = "correct-login";
      const email = "correct-login@user.com";
      const password = "ASDF123adf";

      await createUser(username, email, password);

      const response = await loginUser(email, password);
      const { data } = response;

      expect(data.name).toBe(username);
      expect(data.accessToken).toEqual(expect.any(String));
      expect(data.accessToken).toContain(".");
      expect(data.password).toBeUndefined();
    });
  });

  it("should return error when user does not exist", async () => {
    const email = "incorrect@user.com";
    const password = "ASDF123asdf";

    const response = await loginUser(email, password);
    const { data } = response;

    expect(response.status).toBe(400);
    expect(data.error).toBe("Bad Request");
    expect(data.message).toBe("Invalid credentials - CRUD");
  });

  it("should return error when the password is not valid", async () => {
    const email = "incorrect@user.com";
    const password = "ASDF";

    const response = await loginUser(email, password);
    const { data } = response;

    expect(response.status).toBe(400);
    expect(data.error).toBe("Bad Request");
    expect(data.message).toBe(
      "The password must be at least 8 characters long, include uppercase, lowercase and a number. - CRUD"
    );
  });

  it("should return error when the email is invalid", async () => {
    const email = "incorrect";
    const password = "ASDF123asdf";

    const response = await loginUser(email, password);
    const { data } = response;

    expect(response.status).toBe(400);
    expect(data.error).toBe("Bad Request");
    expect(data.message).toBe("Invalid email format - CRUD");
  });
});
