const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const Place = require("./models/Place");

const app = new express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "randomStringHere";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
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
          console.log(UserDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("Not found");
  }
});

//to get token for account
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

//to post a new place
router.post("/places", (req, res) => {
  const { token } = req.cookies;
  const { title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    addedPhotos } = req.body
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: user.id,
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      photos: addedPhotos
    })
    res.json(placeDoc)
  })
})

//to upload photos by link
router.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});


//To upload a photo from pc
const photosMiddleware = multer({ dest: "uploads/" });

router.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    console.log(path);
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

// To get user's uploded places. Something is not working.
router.get("/places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

//to get existing info of place form db
router.get('/places/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Place.findById(id))
})

//to update existing info of place in db
router.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const { id, title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    addedPhotos } = req.body

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const placeDoc = await Place.findById(id)
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        id, title,
        address,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        photos: addedPhotos
      })
      await placeDoc.save()
      res.json('ok')
    }
  })
})

router.post("/logout", (req, res) => {
  res.clearCookie("token").json(true);
});

//for every rout
router.get("*", (req, res) => {
  console.log("response was sent to the browser");
  res.send("You accessed the node server");
});

//to test if api works
router.get("/test", (req, res) => {
  res.json("test ok");
});

app.use(router);

app.listen(4000, function () {
  console.log("Server is up on http://localhost:4000");
});