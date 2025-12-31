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

const login = async (email, password) => {
  const response = await fetch(`${BFF_URL}/api/users/login`, {
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

/* =====================
   Tests
===================== */

describe("API - BFF", () => {
  describe("Login user tests", () => {
    it("should login a user", async () => {
      const username = "user";
      const email = "usercorrect@test.com";
      const password = "ASDF123adf";

      await createUser(username, email, password);

      const response = await login(email, password);
      const { data } = response;

      expect(data.username).toBe(username);
      expect(data.token).toEqual(expect.any(String));
      expect(data.token).not.toContain(".");
    });
  });

  it("should return error when the user doesn't exist", async () => {
    const email = "notExist@exist.com";
    const password = "ASDF123asdf";

    const response = await login(email, password);
    const { data } = response;

    expect(response.status).toBe(401);
    expect(data.message).toBe("Invalid credentials - CRUD");
  });

  it("should return error when the password is invalid", async () => {
    const email = "notExist@test.com";
    const password = "asdf";

    const response = await login(email, password);
    const { data } = response;

    expect(response.status).toBe(401);
    expect(data.message).toBe(
      "The password must be at least 8 characters long, include uppercase, lowercase and a number. - CRUD"
    );
  });

  it("should return error when the email has invalid format", async () => {
    const email = "notExist";
    const password = "asd";

    const response = await login(email, password);
    const { data } = response;

    expect(response.status).toBe(401);
    expect(data.message).toBe("Invalid email format - CRUD");
  });
});
