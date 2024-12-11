const express = require("express");
const cors = require("cors");
const db = require("./db/index.js"); // Importing the DB connection
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

// Test Database Connection
(async () => {
  try {
    await db.query("SELECT NOW()");
    console.log("Database connection test successful.");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1); // Exit if the database connection fails
  }
})();

// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const restaurantRatingsData = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;"
    );

    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    });
  } catch (err) {
    console.error("Error fetching restaurants:", err.message);
    res.status(500).json({ error: "An error occurred while fetching restaurants." });
  }
});

// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.error("Error fetching restaurant:", err.message);
    res.status(500).json({ error: "An error occurred while fetching the restaurant." });
  }
});

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.error("Error creating restaurant:", err.message);
    res.status(500).json({ error: "An error occurred while creating the restaurant." });
  }
});

// Update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.error("Error updating restaurant:", err.message);
    res.status(500).json({ error: "An error occurred while updating the restaurant." });
  }
});

// Delete a Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
    res.status(204).json({ status: "success" });
  } catch (err) {
    console.error("Error deleting restaurant:", err.message);
    res.status(500).json({ error: "An error occurred while deleting the restaurant." });
  }
});

// Add a Review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );

    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.error("Error adding review:", err.message);
    res.status(500).json({ error: "An error occurred while adding the review." });
  }
});

// Start Server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
