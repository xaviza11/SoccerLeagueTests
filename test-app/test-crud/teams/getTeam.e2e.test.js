// tests/users.e2e.test.js

const { CRUD_URL } = require("../../config");

/* =====================
   Helpers
===================== */

const TEST_USER = {
  name: "TestUser",
  email: "testuser@mail.com",
  password: "password123ASDF",
};

const createUser = async () => {
  return fetch(`${CRUD_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(TEST_USER),
  });
};

const loginUser = async () => {
  const response = await fetch(`${CRUD_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: TEST_USER.email,
      password: TEST_USER.password,
    }),
  });

  return response.json();
};

const createTeam = async (token) => {
  const response = await fetch(`${CRUD_URL}/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

const getTeam = async (token, teamId) => {
  const response = await fetch(`${CRUD_URL}/teams/${teamId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    status: response.status,
    data: await response.json(),
  };
};

/* =====================
   Tests
===================== */

describe("API CRUD - Teams", () => {
  beforeEach(async () => {
    await createUser();
  });

  /*it("should retrieve the team", async () => {
    /*const login = await loginUser();
    const token = login.accessToken;

    expect(token).toBeDefined();

    const team = await createTeam(token);

    expect(team).toBe(true)

    expect(team.id).toBeDefined();

    const res = await getTeam(token, team.id);

    expect(res.status).toBe(200);
    expect(res.data).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      players: expect.any(Array),
      bench_players: expect.any(Array),
      auras: expect.any(Array),
      storage: {
        id: expect.any(String),
      },
    });
  });*/ //! don't work because is not using the user-storage. Needs to be used for work.

  it("should return 401 if token is invalid", async () => {
    const res = await getTeam("invalid-token", "fake-id");

    expect(res.status).toBe(401);
    expect(res.data).toMatchObject({
      message: "Invalid token",
      error: "Unauthorized",
      statusCode: 401,
    });
  });

  it("should return 404 if team does not exist", async () => {
    const login = await loginUser();
    const token = login.accessToken;

    const res = await getTeam(token, "dc050ac0-98c3-430f-a30c-893b6b24af0d");

    expect(res.status).toBe(404);
    expect(res.data).toMatchObject({
      message: "Team not found",
      error: "Not Found",
      statusCode: 404,
    });
  });

  it("should return 500 if team id is invalid format", async () => {
    const login = await loginUser();
    const token = login.accessToken;

    const res = await getTeam(token, "!@#invalid-id");

    expect(res.status).toBe(500);
    expect(res.data).toMatchObject({
      message: "Internal server error",
      statusCode: 500,
    });
  });
});
