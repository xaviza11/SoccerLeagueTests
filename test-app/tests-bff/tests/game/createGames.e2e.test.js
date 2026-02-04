const { GameClient } = require("../../helpers/apiClients/index.js");

//** This test must be ejecuted whit npx jest tests-bff/tests/game/createGame.e2e.test.js*/

describe("API - BFF", () => {
  //before to ejecute this tests create the users using node tests-bff/helpers/scripts/seedUsers.js

  /*describe("Create Games", () => {
    it("Should create games for 19999 users under acceptable time", async () => {
      const start = Date.now();

      const response = await GameClient.createGames();

      const duration = Date.now() - start;
      console.log(`⏱ createGames took ${duration} ms`);

      expect(response.status).toBe(201);
      expect(response.data.processed).toBe(19999);

      // performance assertion
      expect(duration).toBeLessThan(5000); // for 19999 completed on 0.750s, 

      // 0.8s / 19999 = 0.000040002
      
      // for 199999 * t = 21s
      // 21 / 199999 = 0.000105000525
      
      // for 1999999
      // 1999999 * 0002 = 399s => 6-7m
    });
  });*/
});
