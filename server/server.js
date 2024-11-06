require("dotenv").config();
const express = require("express");
const db = require("./db");
const morgan = require("morgan");
const cors = require("cors")
const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(`
    SELECT * FROM restaurants;
    `);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const results = await db.query(
      `
      SELECT * FROM restaurants
      WHERE id = $1;
      `,
      [id]
    );
    console.log(req.params);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
