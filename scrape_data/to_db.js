const fs = require("fs");
const { Client } = require("pg");

const { Pool } = require("pg");
const db = new Pool({
  user: "halal_user",
  host: "dpg-ctbrdgtumphs73arrihg-a.oregon-postgres.render.com",
  database: "halal_web_app",
  password: "CELD1F868xBo1oqgydY36uUAO1UNPniI",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // This disables strict SSL validation
  },
});



// Connect to the database
client.connect()
  .then(() => console.log("Connected to the database."))
  .catch((err) => console.error("Error connecting to the database:", err));

// Read JSON file
fs.readFile("restaurants.json", "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const jsonData = JSON.parse(data);
  const restaurants = jsonData.local_results;

  for (const restaurant of restaurants) {
    const {
      title,
      address, // Map to location
      rating,
      phone,
      website,
      type,
      operating_hours,
      service_options,
      order_online,
      thumbnail,
    } = restaurant;

    const operatingHoursJSON = JSON.stringify(operating_hours || {});
    const serviceOptionsJSON = JSON.stringify(service_options || {});

    // Insert data into the database
    const query = `
      INSERT INTO restaurants (
        name, 
        location, 
        rating, 
        phone_number, 
        website, 
        type, 
        operating_hours, 
        service_options, 
        order_online, 
        thumbnail
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    const values = [
      title,
      address || "Unknown Location", // Use default value if address is null
      rating || null,
      phone || null,
      website || null,
      type || null,
      operatingHoursJSON,
      serviceOptionsJSON,
      order_online || null,
      thumbnail || null,
    ];

    try {
      await client.query(query, values);
      console.log(`Inserted: ${title}`);
    } catch (error) {
      console.error(`Error inserting ${title}:`, error);
    }
  }

  // Close the database connection
  client.end()
    .then(() => console.log("Database connection closed."))
    .catch((err) => console.error("Error closing the database connection:", err));
});
