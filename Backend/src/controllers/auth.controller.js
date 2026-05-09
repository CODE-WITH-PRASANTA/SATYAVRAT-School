const Admin = require("../models/admin.models");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// ================= LOGIN =================

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // CHECK USER
    const admin = await Admin.findOne({
      username,
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        username: admin.username,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};