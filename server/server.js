require("dotenv").config();
const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("yeah our middleware")
  next()
})

app.get("/api/v1/restaurants", (req, res) => {
  console.log("route handler ran")
  res.status(200).json({
    status: "success",
    data: {
      restaurant: ["mcdonalds", "wendys"],
    }
    
  });
});

app.get("/api/v1/restaurants/:restaurant_id", (req, res) => {
  console.log(req.params)
})

app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body)

})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
