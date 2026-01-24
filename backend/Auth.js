const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./Schema/UserModel");
const auth = require("./middleWare");
const router = express.Router();

router.get("/home", (req, res) => {
  res.json({ message: "welcome to home" });
});

//register
router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      password: hashPassword,
      role,
    });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY },
    );

    res.cookie("jwt", token, {
      httpOnly: true, // ❌ Blocks XSS
      secure: false, // 🔒 HTTPS only
      sameSite: "strict", // 🛡️ CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.cookie("role", user.role, {
      httpOnly: false, // readable by frontend
      secure: false, // set true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // res.json({ token });
    res.json({ message: "Login successful" });

    console.log(token);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
