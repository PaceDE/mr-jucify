const connectToMongo = require("./db");
const express = require("express");
// In your backend (Express.js server)
const path = require("path");
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;
//app.use("/images", express.static(path.join(__dirname, "images")));

app.use(cors()); // Allow all origins
 app.use(express.json());

app.use('/api/product',require('./routes/product'));
app.use('/api/auth', require("./routes/auth"));
app.use('/api/activity',require('./routes/activity'));
//app.use("/api/fetchallproduct", require("./routes/fetchProduct"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
