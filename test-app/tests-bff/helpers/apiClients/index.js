const Users = require("./users.js")
const GameData = require("./gameData.js")

const UsersClient = new Users();
const GameDataClient = new GameData();

module.exports = { UsersClient, GameDataClient }
