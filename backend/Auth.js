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
    const user = await User.findOne({ username });

    // console.log("LOGIN USER:", user?.username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );


    res.json({
      success: true,
      message: "Login successful",
      token, // Frontend stores this manually
      user: { id: user._id, role: user.role },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
