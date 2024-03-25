const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Image Storage Engine 
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    console.log(file);
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), async (req, res) => {
  try {
    res.json({
      success: 1,
      image_url: `http://localhost:4000/images/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose
  .connect(
    "mongodb+srv://marwanibounou:Naruto91@cluster0.oavsd1m.mongodb.net/e-commerce"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });

// Middleware
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ errors: "Please authenticate using a valid token" });
  }
};

// Schema for creating user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Schema for creating Product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
  },
  old_price: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

app.get("/", (req, res) => {
  res.send("Root");
});

// Create an endpoint at ip/login for login the user and giving token
app.post(
  "/login",
  async (req, res) => {
    console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: success, errors: "User not found" });
    }
    const passCompare = req.body.password === user.password;
    if (!passCompare) {
      return res.status(400).json({ success: success, errors: "Invalid password" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    success = true;
    console.log(user.id);
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success, token });
  }
);

// Create an endpoint at ip/auth for regestring the user in data base & sending token
app.post(
  "/signup",
  async (req, res) => {
    console.log("Sign Up");
    let success = false;
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ success: success, errors: "Please enter all required fields" });
    }
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: success, errors: "Existing user found with this email" });
    }
    let cart = {};
    for (let i =
