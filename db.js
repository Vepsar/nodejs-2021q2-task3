const Sequelize = require("sequelize");
//database username   password
const sequelize = new Sequelize("gamedb", "postgres", "12345", {
  host: "localhost",
  dialect: "postgres",
  port: "5433",
});

const User = require("./models/user")(sequelize, Sequelize);
const Game = require("./models/game")(sequelize, Sequelize);

sequelize.authenticate().then(
  function success() {
    console.log("Connected to DB");
  },

  function fail(err) {
    console.log(`Error: ${err}`);
  }
);

function sync() {
  console.log("sync");
}

module.exports = {
  sequelize: sequelize,
  user: User,
  game: Game,
  sync: sync,
};
