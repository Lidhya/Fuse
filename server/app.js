const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");
const notificationsRouter = require("./routes/notification");

// db connection cloud
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then((response) => {
  console.log('Connected to database');
}).catch((err) => {
  console.log(`Database connection ${err}`);
});

// db connection local
// mongoose
//   .connect("mongodb://localhost:27017/Fuse", { useNewUrlParser: true })
//   .then((response) => {
//     console.log("Connected to database");
//   })
//   .catch((err) => {
//     console.log(`Database connection ${err}`);
//   });

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: "https://thefuse.netlify.app",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/post", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/notifications", notificationsRouter);

app.use(function (req, res, next) {
  res.status(404).json(`error: page not found`);
});

module.exports = app;
