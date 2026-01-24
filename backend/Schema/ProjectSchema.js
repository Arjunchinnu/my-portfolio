const express = require("express");
const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  technoUsed: {
    type: String,
    required: true,
  },
  projectUrl: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
});

const projectModel = mongoose.model("Project", projectSchema);

module.exports = projectModel;
