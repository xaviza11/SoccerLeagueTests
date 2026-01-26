const { CRUD_URL } = require("../../config");

/* =====================
   Helpers
===================== */

const TEST_USER = {
  name: "TestUser234",
  email: "testuser234@mail.com",
  password: "password123ASDF",
};

const createUser = async () => {
  await fetch(`${CRUD_URL}/users`, {
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

  const data = await response.json();
  return { status: response.status, data };
};

const getUserStorage = async (token, storageId) => {
  const response = await fetch(`${CRUD_URL}/users-storage/${storageId}`, {
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

describe("API CRUD - Users Storage", () => {
  beforeEach(async () => {
    await createUser();
  });

  /*it("should retrieve the user storage", async () => {
    const loginRes = await loginUser();

    const token = loginRes.data.accessToken;
    expect(loginRes).toBe(true)
    const storageId = loginRes.data.storage.id;

    const res = await getUserStorage(token, storageId);

    expect(res).toBe(true)

    expect(res.status).toBe(200);

    expect(res.data).toMatchObject({
      id: expect.any(String),
      cards: expect.any(Array),
      position_change_cards: expect.any(Number),
      team: {
        id: expect.any(String),
      },
    });
  });*/ //! don't work because it needs to do the retrieve user

  it("should return 401 if token is invalid", async () => {
    const res = await getUserStorage("invalid-token", "fake-id");

    expect(res.status).toBe(401);
    expect(res.data).toMatchObject({
      message: "Invalid token",
      error: "Unauthorized",
      statusCode: 401,
    });
  });

  it("should return 404 if storage does not exist", async () => {
    const loginRes = await loginUser();
    const token = loginRes.data.accessToken;

    const res = await getUserStorage(token, "6771da2e-4954-499f-905b-d58860421e57");

    expect(res.status).toBe(404);
    expect(res.data).toMatchObject({
      message: "Storage not found",
      error: "Not Found",
      statusCode: 404,
    });
  });

  it("should return 500 if storage id is invalid format", async () => {
    const loginRes = await loginUser();
    const token = loginRes.data.accessToken;

    const res = await getUserStorage(token, "!@#invalid-id");

    expect(res.status).toBe(500);
    expect(res.data).toMatchObject({
      message: "Internal server error",
      statusCode: 500,
    });
  });
});
