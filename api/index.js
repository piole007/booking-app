const express = require("express");
const cors = require('cors');
require('dotenv').config()
const bcrypt = require('bcryptjs')
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User");

const app = new express();
const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))

mongoose.connect(process.env.MONGO_URL)

var router = express.Router()

router.get('/test', (req, res) => {
  res.json('test ok')
})

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await UserModel.create({
      name, 
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
    res.json({ newUser })
  } catch (error) {
    res.status(422).json(error)
  }
  
})

router.get('*', (req, res) => {
  console.log('response was sent to the browser');
  res.send("You accessed the node server")
})

app.use(router)

app.listen(4000, function () {
  console.log('Server is up on http://localhost:4000');
});
