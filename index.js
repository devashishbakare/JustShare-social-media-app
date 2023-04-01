const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const db = require("./config/mongoose");
db();

// app.use("/", (req, res) => {
//   return res.send("hey working now");
// });

app.use("/", require("./routes/index"));

app.listen(process.env.PORT, (err) => {
  if (err) console.error("Error in connecting to port");

  console.log(`App running on port ${process.env.PORT}`);
});
