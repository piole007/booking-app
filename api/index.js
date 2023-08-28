const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");

const app = new express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "randomStringHere";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

mongoose.connect(process.env.MONGO_URL);

var router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({ newUser });
  } catch (error) {
    res.status(422).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const UserDoc = await UserModel.findOne({ email });
  if (UserDoc) {
    const rightPassword = bcrypt.compareSync(password, UserDoc.password);
    if (rightPassword) {
      jwt.sign(
        {
          email: UserDoc.email,
          id: UserDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(UserDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("Not found");
  }
});

router.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { name, email, id } = await UserModel.findById(user.id);
      res.json({ name, email, id });
    });
  } else {
    res.json(null);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").json(true);
});

router.get("/test", (req, res) => {
  res.json("test ok");
});

router.get("*", (req, res) => {
  console.log("response was sent to the browser");
  res.send("You accessed the node server");
});

app.use(router);

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(__dirname + "/uploads/" + newName);
});

app.listen(4000, function () {
  console.log("Server is up on http://localhost:4000");
});
