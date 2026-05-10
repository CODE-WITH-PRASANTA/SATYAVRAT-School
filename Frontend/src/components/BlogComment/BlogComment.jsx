import React, {
  useEffect,
  useState,
} from "react";

import "./BlogComment.css";

import {
  FaReply,
  FaPaperPlane,
  FaUserCircle,
} from "react-icons/fa";

import {
  useParams,
} from "react-router-dom";

import API from "../../api/axios";

/* ================= API ================= */

const COMMENT_API =
  "/news-comments";

const BlogComment = () => {

  const { id } = useParams();

  const [comments, setComments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      website: "",
      message: "",
    });

  const [replyData, setReplyData] =
    useState({
      parentId: null,
      text: "",
    });

  /* ================= FETCH COMMENTS ================= */

  const fetchComments = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `${COMMENT_API}/blog/${id}`
      );

      setComments(
        res.data.data || []
      );
    } catch (error) {
      console.error(
        "FETCH COMMENTS ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  /* ================= ADD COMMENT ================= */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.message
    )
      return;

    try {
      await API.post(
        COMMENT_API,
        {
          blogId: id,

          name: form.name,

          email: form.email,

          website: form.website,

          message: form.message,

          status: "Approved",
        }
      );

      setForm({
        name: "",
        email: "",
        website: "",
        message: "",
      });

      fetchComments();
    } catch (error) {
      console.error(
        "COMMENT ERROR:",
        error
      );
    }
  };

  /* ================= ADD REPLY ================= */

  const handleReplySubmit =
    async (parentId) => {
      if (!replyData.text)
        return;

      try {
        await API.post(
          COMMENT_API,
          {
            blogId: id,

            parentId,

            name: "Visitor",

            email: "",

            website: "",

            message:
              replyData.text,

            status: "Approved",
          }
        );

        setReplyData({
          parentId: null,
          text: "",
        });

        fetchComments();
      } catch (error) {
        console.error(
          "REPLY ERROR:",
          error
        );
      }
    };

  return (
    <section className="BlogComment">

      <div className="BlogComment__container">

        {/* HEADER */}
        <div className="BlogComment__commentsHeader">

          <h2 className="BlogComment__title">

            Comments (
            {comments.length})

          </h2>

          <p className="BlogComment__subtitle">

            Share your thoughts
            and reply to
            discussions.

          </p>

        </div>

        {/* ================= COMMENTS ================= */}

        <div className="BlogComment__commentsList">

          {loading ? (

            <div className="BlogComment__empty">
              Loading comments...
            </div>

          ) : comments.length ===
            0 ? (

            <div className="BlogComment__empty">
              No comments yet
            </div>

          ) : (

            comments.map(
              (comment) => (

                <div
                  className="BlogComment__commentCard"
                  key={
                    comment._id
                  }
                >

                  {/* AVATAR */}
                  <div className="BlogComment__avatarWrap">

                    <FaUserCircle />

                  </div>

                  {/* CONTENT */}
                  <div className="BlogComment__commentContent">

                    <div className="BlogComment__top">

                      <div>

                        <h4>
                          {
                            comment.name
                          }
                        </h4>

                        <span>

                          {new Date(
                            comment.createdAt
                          ).toDateString()}

                        </span>

                      </div>

                      <button
                        className="BlogComment__replyBtn"
                        onClick={() =>
                          setReplyData(
                            {
                              parentId:
                                comment._id,

                              text: "",
                            }
                          )
                        }
                      >

                        <FaReply />

                        Reply

                      </button>

                    </div>

                    <p>
                      {
                        comment.message
                      }
                    </p>

                    {/* ================= REPLIES ================= */}

                    {comment.replies
                      ?.length >
                      0 && (

                      <div className="BlogComment__replyList">

                        {comment.replies.map(
                          (
                            reply
                          ) => (

                            <div
                              className="BlogComment__replyCard"
                              key={
                                reply._id
                              }
                            >

                              <div className="BlogComment__replyAvatar">

                                <FaUserCircle />

                              </div>

                              <div className="BlogComment__replyContent">

                                <h5>
                                  {
                                    reply.name
                                  }
                                </h5>

                                <span>

                                  {new Date(
                                    reply.createdAt
                                  ).toDateString()}

                                </span>

                                <p>

                                  {
                                    reply.message
                                  }

                                </p>

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    )}

                    {/* ================= REPLY BOX ================= */}

                    {replyData.parentId ===
                      comment._id && (

                      <div className="BlogComment__replyBox">

                        <textarea
                          placeholder="Write your reply..."
                          value={
                            replyData.text
                          }
                          onChange={(
                            e
                          ) =>
                            setReplyData(
                              {
                                ...replyData,
                                text:
                                  e
                                    .target
                                    .value,
                              }
                            )
                          }
                        />

                        <button
                          onClick={() =>
                            handleReplySubmit(
                              comment._id
                            )
                          }
                        >

                          Send Reply

                        </button>

                      </div>

                    )}

                  </div>

                </div>

              )
            )

          )}

        </div>

        {/* ================= FORM ================= */}

        <div className="BlogComment__formSection">

          <h2 className="BlogComment__formTitle">

            Leave A Comment

          </h2>

          <form
            className="BlogComment__form"
            onSubmit={
              handleSubmit
            }
          >

            <textarea
              className="BlogComment__textarea"
              placeholder="Write your comment..."
              value={
                form.message
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  message:
                    e.target
                      .value,
                })
              }
            />

            <div className="BlogComment__inputRow">

              <input
                type="text"
                placeholder="Your Name"
                className="BlogComment__input"
                value={
                  form.name
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="email"
                placeholder="Your Email"
                className="BlogComment__input"
                value={
                  form.email
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Website"
                className="BlogComment__input"
                value={
                  form.website
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    website:
                      e.target
                        .value,
                  })
                }
              />

            </div>

            <button
              type="submit"
              className="BlogComment__submitBtn"
            >

              <FaPaperPlane />

              Send Comment

            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default BlogComment;