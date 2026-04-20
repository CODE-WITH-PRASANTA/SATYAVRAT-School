import React from "react";
import "./BlogComment.css";
import { FaReply } from "react-icons/fa";

const commentsData = [
  {
    id: 1,
    name: "Game Smith",
    date: "Mar 7, 2017",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    text: "leads a rag-tag fugitive fleet on a lonely quest - a shining planet known as Earth. So lets make the most of this beautiful day.",
  },
  {
    id: 2,
    name: "Adam Gem",
    date: "Mar 10, 2017",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    text: "Just two good ol' boys Wouldn't change if they could. Fightin' the system like a true modern day Robin Hood.",
  },
  {
    id: 3,
    name: "John Doe",
    date: "Mar 19, 2017",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    text: "Ne Go Speed Racer go. And you know where you were then. Mister we could use a man like Herbert Hoover again.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1516627145497-ae6968895b75?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=300&q=80",
];

const tags = ["Music", "Toys", "Sports", "Childhood", "Education", "Nutritions", "Link"];

const BlogComment = () => {
  return (
    <section className="BlogComment">
      <div className="BlogComment__container">
        <div className="BlogComment__left">
          <div className="BlogComment__commentsHeader">
            <h2 className="BlogComment__title">Comments (3)</h2>
          </div>

          <div className="BlogComment__commentsList">
            {commentsData.map((comment) => (
              <div className="BlogComment__commentCard" key={comment.id}>
                <div className="BlogComment__commentAvatarPart">
                  <div className="BlogComment__avatarWrap">
                    <img
                      src={comment.image}
                      alt={comment.name}
                      className="BlogComment__avatar"
                    />
                  </div>
                  <h4 className="BlogComment__userName">{comment.name}</h4>
                </div>

                <div className="BlogComment__commentContent">
                  <span className="BlogComment__date">{comment.date}</span>
                  <p className="BlogComment__text">{comment.text}</p>

                  <button className="BlogComment__replyBtn" type="button">
                    <FaReply />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="BlogComment__formSection">
            <h2 className="BlogComment__formTitle">Leave A Comment</h2>

            <form className="BlogComment__form">
              <textarea
                className="BlogComment__textarea"
                placeholder="Type Your Message..."
              ></textarea>

              <div className="BlogComment__inputRow">
                <input
                  type="text"
                  className="BlogComment__input"
                  placeholder="Your full name..."
                />
                <input
                  type="email"
                  className="BlogComment__input"
                  placeholder="Your email id..."
                />
                <input
                  type="text"
                  className="BlogComment__input"
                  placeholder="Website"
                />
              </div>

              <button type="submit" className="BlogComment__submitBtn">
                Send Your Message
              </button>
            </form>
          </div>
        </div>

        <aside className="BlogComment__right">
          <div className="BlogComment__sidebarInner">
            <div className="BlogComment__widget">
              <h3 className="BlogComment__widgetTitle">Gallery</h3>

              <div className="BlogComment__gallery">
                {galleryImages.map((image, index) => (
                  <div className="BlogComment__galleryItem" key={index}>
                    <img
                      src={image}
                      alt={`gallery-${index + 1}`}
                      className="BlogComment__galleryImg"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="BlogComment__widget">
              <h3 className="BlogComment__widgetTitle">Tags</h3>

              <div className="BlogComment__tags">
                {tags.map((tag, index) => (
                  <button key={index} type="button" className="BlogComment__tag">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default BlogComment;