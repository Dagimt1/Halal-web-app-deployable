const { Pool } = require("pg");

const pool = new Pool({
  user: "halal_user",
  host: "dpg-ctbrdgtumphs73arrihg-a.oregon-postgres.render.com",
  database: "halal_web_app",
  password: "CELD1F868xBo1oqgydY36uUAO1UNPniI",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
