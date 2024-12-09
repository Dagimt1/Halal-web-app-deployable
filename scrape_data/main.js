
const { getJson } = require("serpapi");
const fs = require("fs");

getJson({
  engine: "google_maps",
  q: "halal",
  ll: "@41.698505,-88.068287,14z",
  api_key: "f5bf38ba3bdcda3528ebd1690b1daebec45f559efb3d1409da9b59a4ac7a8b8d"
}, (json) => {
  // Save the JSON response to a file
  fs.writeFile("restaurants.json", JSON.stringify(json, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("JSON file was written successfully.");
    }
  });
});
