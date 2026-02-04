const Users = require("./users.js")
const GameData = require("./gameData.js")
const Game = require("./game.js")

const UsersClient = new Users();
const GameDataClient = new GameData();
const GameClient = new Game();

module.exports = { UsersClient, GameDataClient, GameClient }
