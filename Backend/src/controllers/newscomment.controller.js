const NewsComment = require("../models/newscomment.models");

/* ================= CREATE COMMENT ================= */

const createComment = async (req, res) => {
  try {
    const newComment = new NewsComment(req.body);

    const savedComment =
      await newComment.save();

    res.status(201).json({
      success: true,
      data: savedComment,
    });
  } catch (error) {
    console.error(
      "CREATE COMMENT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to create comment",
    });
  }
};

/* ================= GET COMMENTS ================= */

const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments =
      await NewsComment.find({
        blogId,
        parentId: null,
        status: "Approved",
      }).sort({
        createdAt: -1,
      });

    const replies =
      await NewsComment.find({
        blogId,
        parentId: { $ne: null },
        status: "Approved",
      });

    const formattedComments =
      comments.map((comment) => ({
        ...comment._doc,

        replies: replies.filter(
          (reply) =>
            reply.parentId?.toString() ===
            comment._id.toString()
        ),
      }));

    res.status(200).json({
      success: true,
      data: formattedComments,
    });
  } catch (error) {
    console.error(
      "GET COMMENTS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch comments",
    });
  }
};

/* ================= GET ALL ADMIN COMMENTS ================= */

const getAllComments = async (
  req,
  res
) => {
  try {
    const comments =
      await NewsComment.find()
        .populate("blogId", "title")
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error(
      "ADMIN COMMENTS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch admin comments",
    });
  }
};

/* ================= UPDATE STATUS ================= */

const updateCommentStatus =
  async (req, res) => {
    try {
      const updated =
        await NewsComment.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      console.error(
        "UPDATE STATUS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update comment status",
      });
    }
  };

/* ================= DELETE ================= */

const deleteComment = async (
  req,
  res
) => {
  try {
    await NewsComment.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Comment deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE COMMENT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete comment",
    });
  }
};

module.exports = {
  createComment,
  getComments,
  getAllComments,
  updateCommentStatus,
  deleteComment,
};