const { BFF_URL } = require("../../../config");

class GameData {
  constructor() {
    this.baseUrl = BFF_URL;
  }

  async retrieveGameData(token) {
    try {
      const response = await fetch(`${this.baseUrl}/api/game-data`, {
        methods: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      return {
        status: response.status,
        data,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message || "Unknow error",
      };
    }
  }

  async updateLineup(token, players) {
    try {
      const response = await fetch(`${this.baseUrl}/api/team/update-lineup`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ players }),
      });
      const data = await response.json();
      return {
        status: response.status,
        data,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message || "Unknow error",
      };
    }
  }
}

module.exports = GameData;
