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
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.image_url && <img src={`http://localhost:8000/images/${post.image_url}`} alt={post.caption} />}
      <h3>Comments</h3>
      {post.comments && post.comments.length > 0 ? (
        post.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default Post;
