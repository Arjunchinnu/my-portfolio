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
// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username: username });
//     console.log("user :", user);

//     if (!user) {
//       return res.status(400).json({ message: "user not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRY },
//     );

//     res.cookie("jwt", token, {
//       httpOnly: true,
//       secure: false, // localhost/Render
//       sameSite: "lax",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.cookie("role", user.role, {
//       httpOnly: false,
//       secure: false,
//       sameSite: "lax",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     // res.cookie("jwt", token, {
//     //   httpOnly: true,
//     //   secure: false,
//     //   sameSite: "none",
//     //   maxAge: 7 * 24 * 60 * 60 * 1000,
//     // });

//     // res.cookie("role", user.role, {
//     //   httpOnly: true,
//     //   secure: false,
//     //   sameSite: "none",
//     //   maxAge: 7 * 24 * 60 * 60 * 1000,
//     // });

//     // res.json({ token });
//     res.json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         role: user.role,
//         authenticated: true,
//       },
//     });

//     console.log(token);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    console.log("👤 LOGIN USER:", user?.username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    // 🔥 NUCLEAR COOKIE FIX - FORCE EVERY SETTING
    res.append(
      "Set-Cookie",
      `jwt=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`,
    );
    res.append(
      "Set-Cookie",
      `role=${user.role}; Path=/; Max-Age=86400; SameSite=Lax`,
    );

    console.log(
      " COOKIES FORCED:",
      `jwt=${token.slice(0, 20)}..., role=${user.role}`,
    );

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, role: user.role },
    });
  } catch (err) {
    console.error(" LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
