const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const db = require("./config/mongoose");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
db();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/", require("./routes/index"));

app.listen(process.env.PORT, (err) => {
  if (err) console.error("Error in connecting to port");

  console.log(`App running on port ${process.env.PORT}`);
});
