const {
  UsersClient,
  GameDataClient,
} = require("../../helpers/apiClients/index.js");

const { players } = require("../../data/players.js");

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

      players.forEach((p, i) => {
        p.isBench ? p.isBench === false : true;
      });

      const r = await GameDataClient.updateLineup(token, players);

      expect(r.data.message).toBe("success");
      expect(r.status).toBe(200);
    });

    it("Should throw error when the player don't own the team.", async () => {
      const usernameA = "userCorrect134354";
      const emailA = "userCorrect123423@gmail.com";
      const passwordA = "ASDF123asdf";

      const usernameB = "userCorrectB4235445";
      const emailB = "userCorrectB123542@gmail.com";
      const passwordB = "ASDF123asdf";

      const createFirstPlayer = await UsersClient.createUser(
        usernameA,
        emailA,
        passwordA,
      );

      const createSecondPlayer = await UsersClient.createUser(
        usernameB,
        emailB,
        passwordB,
      );

      const wrongToken = createSecondPlayer.data.token;

      const token = createFirstPlayer.data.token;

      const resData = await GameDataClient.retrieveGameData(token);

      const players = resData.data.team.players;

      const r = await GameDataClient.updateLineup(wrongToken, players);

      expect(r.data.message).toBe("Error updating lineup");
      expect(r.status).toBe(403);
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


    it("Should throw error when palyers are missing or invalid", async () => {
      const username = "correct3912347863749";
      const email = "correct39376786456349@user.com";
      const password = "ASDF123asdf";

      const response = await UsersClient.createUser(username, email, password);
      const { data } = response;

      const token = data.token;
      expect(typeof token).toBe("string");

      const r = await GameDataClient.updateLineup(token, players);

      expect(r.data.message).toBe("Error updating lineup");
      expect(r.status).toBe(403);
    });
  });
});
