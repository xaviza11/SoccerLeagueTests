const { BFF_URL } = require("../../../config");

class Game {
  constructor() {
    this.baseUrl = BFF_URL;
  }

  async createGames() {
    try {
      const response = await fetch(`${this.baseUrl}/test/create-games`, {
        methods: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return {
        status: response.status,
        data: data,
      };
    } catch(error) {
        return {
            status: 500,
            message: error.message || "error creating games"
        }
    }
  }
}

module.exports = Game