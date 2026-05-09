import React, {
  useEffect,
  useState,
} from "react";

import "./CommentManagement.css";

import API from "../../Api/axios";

import {
  FaCheck,
  FaTrash,
  FaReply,
  FaSearch,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

/* ================= API ================= */

const COMMENT_API =
  "/news-comments";

const CommentManagement = () => {

  const [comments, setComments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [replyText, setReplyText] =
    useState("");

  const [replyId, setReplyId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  /* ================= FETCH COMMENTS ================= */

  const fetchComments = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `${COMMENT_API}/admin/all`
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
    fetchComments();
  }, []);

  /* ================= APPROVE ================= */

  const handleApprove = async (
    id
  ) => {
    try {
      await API.put(
        `${COMMENT_API}/${id}/status`,
        {
          status: "Approved",
        }
      );

      fetchComments();
    } catch (error) {
      console.error(
        "APPROVE ERROR:",
        error
      );
    }
  };

  /* ================= REJECT ================= */

  const handleReject = async (
    id
  ) => {
    try {
      await API.put(
        `${COMMENT_API}/${id}/status`,
        {
          status: "Rejected",
        }
      );

      fetchComments();
    } catch (error) {
      console.error(
        "REJECT ERROR:",
        error
      );
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this comment?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `${COMMENT_API}/${id}`
      );

      fetchComments();
    } catch (error) {
      console.error(
        "DELETE ERROR:",
        error
      );
    }
  };

  /* ================= REPLY ================= */

  const handleReplySubmit =
    async (parentComment) => {
      if (!replyText) return;

      try {
        await API.post(
          COMMENT_API,
          {
            blogId:
              parentComment.blogId
                ?._id,

            parentId:
              parentComment._id,

            name: "Admin",

            email: "",

            website: "",

            message: replyText,

            status: "Approved",
          }
        );

        setReplyText("");
        setReplyId(null);

        fetchComments();
      } catch (error) {
        console.error(
          "REPLY ERROR:",
          error
        );
      }
    };

  /* ================= SEARCH ================= */

  const filteredComments =
    comments.filter((item) =>
      item.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  /* ================= STATS ================= */

  const totalComments =
    comments.length;

  const approvedComments =
    comments.filter(
      (i) =>
        i.status === "Approved"
    ).length;

  const pendingComments =
    comments.filter(
      (i) =>
        i.status === "Pending"
    ).length;

  return (
    <section className="commentAdmin">

      {/* ================= HEADER ================= */}

      <div className="commentAdmin__header">

        <div>

          <h2>
            Comment Management
          </h2>

          <p>
            Approve, reject and manage
            all blog comments.
          </p>

        </div>

        {/* SEARCH */}
        <div className="commentAdmin__search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search comments..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>

      {/* ================= STATS ================= */}

      <div className="commentAdmin__stats">

        <div className="commentAdmin__statCard">

          <h3>
            {totalComments}
          </h3>

          <p>Total Comments</p>

        </div>

        <div className="commentAdmin__statCard">

          <h3>
            {approvedComments}
          </h3>

          <p>Approved</p>

        </div>

        <div className="commentAdmin__statCard">

          <h3>
            {pendingComments}
          </h3>

          <p>Pending</p>

        </div>

      </div>

      {/* ================= COMMENT LIST ================= */}

      <div className="commentAdmin__list">

        {loading ? (

          <div className="commentAdmin__empty">
            Loading comments...
          </div>

        ) : filteredComments.length ===
          0 ? (

          <div className="commentAdmin__empty">
            No comments found
          </div>

        ) : (

          filteredComments.map(
            (comment) => (

              <div
                className="commentAdmin__card"
                key={comment._id}
              >

                {/* TOP */}
                <div className="commentAdmin__top">

                  <div className="commentAdmin__user">

                    <FaUserCircle />

                    <div>

                      <h4>
                        {
                          comment.name
                        }
                      </h4>

                      <span>
                        {
                          comment.email
                        }
                      </span>

                    </div>

                  </div>

                  <span
                    className={`commentAdmin__status ${comment.status.toLowerCase()}`}
                  >
                    {comment.status}
                  </span>

                </div>

                {/* BLOG */}
                <div className="commentAdmin__blog">

                  Blog :

                  <strong>
                    {
                      comment
                        ?.blogId
                        ?.title
                    }
                  </strong>

                </div>

                {/* MESSAGE */}
                <p className="commentAdmin__message">

                  {
                    comment.message
                  }

                </p>

                {/* DATE */}
                <span className="commentAdmin__date">

                  {new Date(
                    comment.createdAt
                  ).toLocaleDateString()}

                </span>

                {/* REPLIES */}
                {comment.replies &&
                  comment.replies
                    .length > 0 && (

                    <div className="commentAdmin__replies">

                      {comment.replies.map(
                        (
                          reply
                        ) => (

                          <div
                            className="commentAdmin__reply"
                            key={
                              reply._id
                            }
                          >

                            <strong>
                              Admin
                              Reply:
                            </strong>

                            <p>
                              {
                                reply.message
                              }
                            </p>

                          </div>

                        )
                      )}

                    </div>

                  )}

                {/* ACTIONS */}
                <div className="commentAdmin__actions">

                  <button
                    className="approve"
                    onClick={() =>
                      handleApprove(
                        comment._id
                      )
                    }
                  >

                    <FaCheck />

                    Approve

                  </button>

                  <button
                    className="reject"
                    onClick={() =>
                      handleReject(
                        comment._id
                      )
                    }
                  >

                    <FaTimes />

                    Reject

                  </button>

                  <button
                    className="reply"
                    onClick={() =>
                      setReplyId(
                        comment._id
                      )
                    }
                  >

                    <FaReply />

                    Reply

                  </button>

                  <button
                    className="delete"
                    onClick={() =>
                      handleDelete(
                        comment._id
                      )
                    }
                  >

                    <FaTrash />

                    Delete

                  </button>

                </div>

                {/* REPLY BOX */}
                {replyId ===
                  comment._id && (

                  <div className="commentAdmin__replyBox">

                    <textarea
                      placeholder="Write admin reply..."
                      value={replyText}
                      onChange={(e) =>
                        setReplyText(
                          e.target.value
                        )
                      }
                    />

                    <button
                      onClick={() =>
                        handleReplySubmit(
                          comment
                        )
                      }
                    >
                      Send Reply
                    </button>

                  </div>

                )}

              </div>

            )
          )

        )}

      </div>

    </section>
  );
};

export default CommentManagement;