const {
  UsersClient,
  GameDataClient,
} = require("../helpers/apiClients/index.js");

const { players } = require("../data/players.js");

describe("API - BFF", () => {
  describe("update line up", () => {
    it("Should update line up when data are correct", async () => {
      const username = "correct393749";
      const email = "correct393749@user.com";
      const password = "ASDF123asdf";

      const response = await UsersClient.createUser(username, email, password);
      const { data } = response;

      const token = data.token;
      expect(typeof token).toBe("string");

      const resData = await GameDataClient.retrieveGameData(token);

      const players = resData.data.team.players;

      const r = await GameDataClient.updateLineup(token, players);

      expect(r.data.message).toBe("success");
      expect(r.status).toBe(200);
    });

    it("Should throw error when token are undefined", async () => {
      const r = await GameDataClient.updateLineup("adfad", []);
      expect(r.data.message).toBe("Invalid token");
      expect(r.status).toBe(401);
    });

    it("Should throw error when token are invalid", async () => {
      const token = "123";

      const r = await GameDataClient.updateLineup(token, []);
      expect(r.data.message).toBe("Invalid token");
      expect(r.status).toBe(401);
    });

    it("Should throw error when players haven't correct lineup", async () => {
      const username = "correct312312393749";
      const email = "correct393712349@user.com";
      const password = "ASDF123asdf";

      const response = await UsersClient.createUser(username, email, password);
      const { data } = response;

      const token = data.token;
      expect(typeof token).toBe("string");

      const responseData = await GameDataClient.retrieveGameData(token);

      responseData.data.team.players[0].position = "Striker";

      const r = await GameDataClient.updateLineup(
        token,
        responseData.data.team.players,
      );

      expect(r.status).toBe(422);
    });

    it("Should throw error when palyers are missing or invalid", async () => {
      const username = "correct3912347863749";
      const email = "correct39376786456349@user.com";
      const password = "ASDF123asdf";

      const response = await UsersClient.createUser(username, email, password);
      const { data } = response;

      const token = data.token;
      expect(typeof token).toBe("string");

      const r = await GameDataClient.updateLineup(token, players);

      expect(r.data.message).toBe("Error updating player");
      expect(r.status).toBe(403);
    });
  });
});
