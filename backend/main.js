const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Project = require("./Schema/ProjectSchema");
const cors = require("cors");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./Cloudinary");
const authRoute = require("./Auth.js");
const { auth, authorize } = require("./middleWare.js");
const cookieParser = require("cookie-parser");

// Connect MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

const app = express();

// Middleware

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://my-portfolio-frontend-yz4e.onrender.com",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/user", authRoute);

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio", // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

app.get("/auth/check", (req, res) => {
  console.log("Auth check - Cookies:", req.cookies); // Render logs
  const isAuthenticated = !!req.cookies.jwt;
  const userRole = req.cookies.role || "user";

  res.json({
    authenticated: isAuthenticated,
    role: userRole,
    cookies: req.cookies, // For debugging
  });
});

//uploading project route
app.post("/postProject", (req, res) => {
  upload.single("image")(req, res, async (err) => {
    try {
      // console.log("posting route detected");
      // console.log("posted data:", req.body);
      // console.log("uploaded file:", req.file);

      if (!req.file) {
        return res.status(400).json({ message: "Image not received" });
      }

      const { projectName, projectDescription, technoUsed, projectUrl } =
        req.body;

      const project = new Project({
        projectName,
        projectDescription,
        technoUsed,
        projectUrl,
        image: req.file.path,
      });

      await project.save();

      res.status(201).json({
        message: "data posted",
        data: project,
      });
    } catch (err) {
      console.error("SERVER ERROR:", err);
      res.status(500).json({
        message: "Server error",
        error: err.message,
      });
    }
  });
});

app.get("/displayProjects", async (req, res) => {
  try {
    let projects = await Project.find({});
    res.status(200).json({
      data: projects,
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Server error while fetching projects" });
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let project = await Project.findOne({ _id: id });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ data: project });
  } catch (err) {
    console.log("error in edit ", err);
  }
});

app.put("/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = req.body;
    // console.log("Updating id:", id);
    // console.log("Updated data:", updatedProject);

    let updatedData = {
      projectName: updatedProject.projectName,
      projectDescription: updatedProject.projectDescription,
      technoUsed: updatedProject.technoUsed,
      projectUrl: updatedProject.projectUrl,
    };

    if (req.file) {
      updatedData.image = req.file.path;
    } else if (req.body.image) {
      updatedData.image = req.body.image;
    }

    const project = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ data: project });
  } catch (err) {
    console.log("error in updating", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      res.status(404).json({ message: "project not found" });
    }
    res
      .status(200)
      .json({ message: "Project deleted successfully", deletedProject });
  } catch (err) {
    console.log("error in deleting", err);
    res.status(500).json({ message: err });
  }
});

app.post("/logout", auth, (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = app;
