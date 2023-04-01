const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.PORT, (err) => {
  if (err) console.error("Error in connecting to port");

  console.log(`App running on port ${process.env.PORT}`);
});
