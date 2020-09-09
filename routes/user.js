const express = require("express");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const router = express.Router();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/user", async (req, res) => {
  try {
    /* const pictureToUpload = req.files.file.path;
    const result = await cloudinary.uploader.upload(pictureToUpload);
    console.log(result); */

    const objPictures = req.files;
    const tabKeyPictures = Object.keys(objPictures);
    const tabResult = [];
    for (let i = 0; i < tabKeyPictures.length; i++) {
      const iPicture = req.files[tabKeyPictures[i]];
      const result = await cloudinary.uploader.upload(iPicture.path);
      tabResult.push(result);
    }

    const name = req.fields.name;
    const email = req.fields.email;
    const password = req.fields.password;

    const newUser = new User({
      name,
      email,
      pictures: tabResult,
      token: password,
      salt: password,
    });
    await newUser.save();
    console.log("7");
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: newUser.token,
      pictures: newUser.pictures,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
