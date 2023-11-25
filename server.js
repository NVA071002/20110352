const path = require("path");
const https = require("https");
const fs = require("fs");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
const { verify } = require("crypto");

const PORT = 3000;
const app = express();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};
const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};
function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile", profile);
  done(null, profile);
}
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
app.use(helmet());
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "Must Login!",
    });
  }
  next();
}
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  }),
  (req, res) => {}
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  }),
  (req, res) => {
    console.log("Google call back");
  }
);
app.get("/auth/logout", (req, res) => {
  req.logOut();
  return res.redirect('/')
});

app.get("/secret", checkLoggedIn, (req, res) => {
  res.send("Your personal secret value is 42!");
});

app.get("/failure", (req, res) => {
  return res.send("Fail to log in");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
