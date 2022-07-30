const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
//const SQLiteStore = require("connect-sqlite3")(session);
const flash = require("connect-flash");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const chalk = require("chalk");
const indexRouter = require("./Routes/indexRouter");
const genreRouter = require("./Routes/genreRouter");
const albumRouter = require("./Routes/albumRouter");
const authRouter = require("./Routes/authRouter");
require("dotenv").config();

//app setups
const app = express();
const port = process.env.PORT;
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "Public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);

app.use(expressLayout);

//database setup
 mongoose.connect("mongodb+srv://Ken_apps:Ken_apps@cluster0.npcrm.mongodb.net/music-album?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlparser: true,
 });
/*mongoose.connect("mongodb://localhost/music-album", {
  useUnifiedTopology: true,
  useNewUrlparser: true,
});*/

const db = mongoose.connection;
db.on("error", () =>
  console.log("error connecting to Music-Album " + chalk.cyan("database"))
);
db.once("open", () =>
  console.log("connected to " + chalk.cyan("Music-Album database"))
);

//views setup
app.set("view engine", "ejs");
app.set("views", "/Views");
app.set("layout", "layouts/layouts");

//middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("keyboard cat"));
app.use(
  session({
    // store: new SQLiteStore,
    secret: "music",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: null },
  })
);
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});
//app.use(passport.authenticate("session"));

//require("./Src/config/passport")(app);

//routes setup
app.use("/", indexRouter);
app.use("/albums", albumRouter);
app.use("/genres", genreRouter);
app.use("/auth", authRouter);

app.listen(port, () => console.log("listening on port " + chalk.cyan(4000)));