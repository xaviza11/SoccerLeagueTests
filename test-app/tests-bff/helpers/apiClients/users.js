const { BFF_URL } = require("../../../config.js")

class Users {
  constructor() {
    this.baseUrl = BFF_URL;
  }

  async createUser(name, email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      return {
        status: response.status,
        data,
      };
    } catch (error) {
      return {
        status: 500,
        data: { message: error.message || "Unknown error" },
      };
    }
  }

  async login(email, password) {
    try {
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
    } catch (error) {
      return {
        status: 500,
        data: { message: error.message || "Unknown error" },
      };
    }
  }
}

module.exports = Users