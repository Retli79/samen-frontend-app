import React, { useState, useEffect } from "react";
import { fetchComments, createComment } from "../api";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ username: "", text: "" });

  useEffect(() => {
    fetchComments(postId).then((response) => {
      setComments(response.data);
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
        setNewComment({ username: "", text: "" }); // Reset the form
      })
      .catch((error) => {
        console.error("There was an error creating the comment!", error);
      });
  };

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
