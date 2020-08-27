const { Pool, types } = require("pg");

const pool = new Pool({
  user: "postgres",
});

types.setTypeParser(1700, (val) => parseFloat(val));

module.exports = {
  pool,
};
