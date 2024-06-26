import React, { useState } from "react";
import Comment from "./Comment";
import { createComment } from "../api";
import "./Post.css";
import { getUsername } from "../auth"; // Import getUsername from auth.js

const Post = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const username = getUsername(); // Retrieve the authenticated username

    if (commentText.trim() && username) {
      const commentData = {
        username, // Use the authenticated username
        text: commentText,
        post_id: post.id,
      };

      createComment(commentData)
        .then((response) => {
          setComments([...comments, response.data]);
          setCommentText("");
        })
        .catch((error) => {
          console.error("There was an error submitting the comment!", error);
        });
    } else {
      console.error("User is not authenticated or comment text is empty");
    }
  };

  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
      {post.image_url && (
        <div className="post-image-container">
          <img className="post-image" src={post.image_url} alt={post.caption} />
        </div>
      )}
      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No comments available</p>
        )}
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Post;
