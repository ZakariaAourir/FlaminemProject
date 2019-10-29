const express = require("express");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");

//creating routes
const index = require("./routes/index");
// init app
const app = express();
// init port
const port = 3000;
// express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  })
);
// Init passport
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/"
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.use("/", index);

app.listen(port, () => {
  console.log("server is running on port " + port);
});
