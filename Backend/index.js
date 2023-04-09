const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
dotenv.config();
const db = require("./config/mongoose");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
db();

app.use(
  session({
    secret: process.env.MONGO_STORE_SECREAT_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser());
app.use("/", require("./routes/index"));

app.listen(process.env.PORT, (err) => {
  if (err) console.error("Error in connecting to port");

  console.log(`App running on port ${process.env.PORT}`);
});
