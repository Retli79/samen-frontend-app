// Comments.js

import React, { useState, useEffect } from "react";
import { fetchComments, createComment, deleteComment } from "../api";
import { getUsername } from "../auth";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    username: getUsername(),
    text: "",
  });

  useEffect(() => {
    fetchComments(postId).then((response) => {
      setComments(response.data); // Assuming each comment object has a 'username' field
    });
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = { ...newComment, post_id: postId };

    createComment(commentData)
      .then((response) => {
        setComments([...comments, response.data]); // Add the new comment to the list
        setNewComment({ ...newComment, text: "" }); // Reset the comment text only
      })
      .catch((error) => {
        console.error("There was an error creating the comment!", error);
      });
  };

  const handleDelete = (commentId) => {
    deleteComment(commentId)
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => {
        console.error("There was an error deleting the comment!", error);
      });
  };
  console.log("comments", comments);
  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={newComment.username}
            onChange={handleChange}
            required
            readOnly
          />
        </div>
        <div>
          <label>Comment</label>
          <textarea
            name="text"
            value={newComment.text}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.username}</strong>: {comment.text}
            {comment.username === getUsername() && (
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
