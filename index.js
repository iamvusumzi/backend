const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./dbConnect");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

dbConnect();

app.get("/", (req, res) => {
  res.json({"message":"Hello, World!"});
});