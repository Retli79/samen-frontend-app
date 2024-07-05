import React from "react";

const Comment = ({ comment, username, onClick }) => {
  return (
    <div>
      <p>
        <strong>{comment.username}</strong>: {comment.text}
      </p>
      <p>
        <small>{new Date(comment.timestamp).toLocaleString()}</small>
      </p>
      {username === comment.username && (
        <button onClick={() => onClick(comment.id)}>Delete comment</button>
      )}
    </div>
  );
};

export default Comment;
