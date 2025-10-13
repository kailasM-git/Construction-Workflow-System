const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { execFile } = require("child_process");

const app = express();
const PORT = 4500;

app.use(cors());
app.use(bodyParser.json());

app.post("/predict", (req, res) => {
  const input = req.body;

  const inputData = JSON.stringify([
    input.area_sqft,
    input.num_floors,
    input.location_index,
    input.material_quality,
  ]);

  execFile("py", ["predict.py", inputData], (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      console.error("stderr:", stderr);
      return res.status(500).json({ error: "Prediction error" });
    }
    res.json({ estimated_cost: parseFloat(stdout) });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
