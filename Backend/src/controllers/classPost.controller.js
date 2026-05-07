const fs = require("fs");
const path = require("path");

const ClassPost = require("../models/classPost.model");

/* =========================
   CREATE CLASS POST
========================= */

exports.createClassPost = async (req, res) => {
  try {
    const {
      classTitle,
      classDescription,
      yearStart,
      yearEnd,
      category,
      teacherPhone,
      uploadImage,
    } = req.body;

    if (!uploadImage) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const newPost = new ClassPost({
      classTitle,
      classDescription,
      yearStart,
      yearEnd,
      category,
      teacherPhone,
      uploadImage,
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Class Post Created Successfully",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ALL CLASS POSTS
========================= */

exports.getAllClassPosts = async (
  req,
  res
) => {
  try {
    const posts = await ClassPost.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   DELETE CLASS POST
========================= */

exports.deleteClassPost = async (
  req,
  res
) => {
  try {
    const post = await ClassPost.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    /* DELETE IMAGE */

    if (post.uploadImage) {
      const cleanPath =
        post.uploadImage.startsWith("/")
          ? post.uploadImage.substring(1)
          : post.uploadImage;

      const imagePath = path.join(
        process.cwd(),
        cleanPath
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await ClassPost.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   UPDATE CLASS POST
========================= */

exports.updateClassPost = async (
  req,
  res
) => {
  try {
    const post = await ClassPost.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    let imagePath = post.uploadImage;

    /* NEW IMAGE */

    if (req.body.uploadImage) {
      /* DELETE OLD IMAGE */

      if (post.uploadImage) {
        const cleanPath =
          post.uploadImage.startsWith("/")
            ? post.uploadImage.substring(1)
            : post.uploadImage;

        const oldImagePath = path.join(
          process.cwd(),
          cleanPath
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      imagePath = req.body.uploadImage;
    }

    const updatedPost =
      await ClassPost.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          uploadImage: imagePath,
        },
        { new: true }
      );

    res.status(200).json({
      success: true,
      message: "Post Updated Successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};