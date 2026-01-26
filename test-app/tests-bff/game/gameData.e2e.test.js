const { UsersClient, GameDataClient } =  require("../helpers/apiClients/index.js");

describe("API - BFF", () => {
  describe("Return game data", () => {
    it("should return the gameData using the correct token and validate skills", async () => {
      const name = "user0289y879";
      const password = "93849GYLKHOasdf";
      const email = "user2903fjh@gmail.com";

      const response = await UsersClient.createUser(name, email, password);
      const { data } = response;

      const token = data.token;
      expect(typeof token).toBe("string");

      const resData = await GameDataClient.retrieveGameData(token);

      const players = resData.data.team.players;
      const benchPlayers = resData.data.team.bench_players;

      expect(Array.isArray(benchPlayers)).toBe(false);

      expect(Array.isArray(players)).toBe(true);
      expect(players.length).toBe(22);

      for (const player of players) {
        const skills = Object.values(player.skills);
        const nonZeroSkills = skills.filter((s) => s > 0);

        expect(nonZeroSkills.length).toBeGreaterThanOrEqual(3);
      }
    });
  });

  it("should throw invalid token when it is not valid", async () => {
    const token = "c3c4185b934f3f17e5a3834876504012:513c23087fe1915e51d6f7c5ab6895cd97ca6347a6fd993d20ea8e5b20e7314a1f4c58d0354e86caf19293c825cb3aa2f868a7bd6246be68d6cd4273b0fa14cd36cc1cea822067ec6dda63c1819a703328b6ffce0e7d1898f09697f53ddc9ce487ed8fa068601fd84d75dc6a23a21fcb99ae0e4e12a8fceae795942cbfe6f5524da5944f7ec51d364019f8b676ff14ff7ffc6bd033bb24d29c9bc9799dfd91558511451d079df646e4ef43a0ad52f4324b0bf4661db65f7a5b790eb779ea849f7f53d2d0c8284f3749957232f3e3cb9f6f2b7bd818eb4c35a9d16f72598408daaba200f4ab693b96cf8b872e7ca23c1d"

    const response = await GameDataClient.retrieveGameData(token);
    const { data } = response;


    expect(response.status).toBe(401);
    expect(data.message === "Invalid token").toBe(true);
  });
});
