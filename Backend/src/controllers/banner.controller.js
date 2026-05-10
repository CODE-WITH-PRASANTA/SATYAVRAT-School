const Banner = require(
  "../models/banner.model"
);

const fs = require("fs");

// ======================================
// CREATE BANNER
// ======================================

exports.createBanner = async (
  req,
  res
) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message:
          "Banner title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Banner image is required",
      });
    }

    const banner =
      await Banner.create({
        title,
        image: req.file.path,
      });

    res.status(201).json({
      success: true,
      message:
        "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET ALL BANNERS
// ======================================

exports.getAllBanners =
  async (req, res) => {
    try {
      const banners =
        await Banner.find().sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        count: banners.length,
        data: banners,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================
// GET SINGLE BANNER
// ======================================

exports.getSingleBanner =
  async (req, res) => {
    try {
      const banner =
        await Banner.findById(
          req.params.id
        );

      if (!banner) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Banner not found",
          });
      }

      res.status(200).json({
        success: true,
        data: banner,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================
// UPDATE BANNER
// ======================================

exports.updateBanner =
  async (req, res) => {
    try {
      const { title } = req.body;

      const banner =
        await Banner.findById(
          req.params.id
        );

      if (!banner) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Banner not found",
          });
      }

      if (title) {
        banner.title = title;
      }

      if (req.file) {
        const oldImagePath =
          banner.image.replace("/", "");

        if (
          fs.existsSync(
            oldImagePath
          )
        ) {
          fs.unlinkSync(
            oldImagePath
          );
        }

        banner.image =
          req.file.path;
      }

      await banner.save();

      res.status(200).json({
        success: true,
        message:
          "Banner updated successfully",
        data: banner,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================
// DELETE BANNER
// ======================================

exports.deleteBanner =
  async (req, res) => {
    try {
      const banner =
        await Banner.findById(
          req.params.id
        );

      if (!banner) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Banner not found",
          });
      }

      const imagePath =
        banner.image.replace("/", "");

      if (
        fs.existsSync(imagePath)
      ) {
        fs.unlinkSync(imagePath);
      }

      await banner.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Banner deleted successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };