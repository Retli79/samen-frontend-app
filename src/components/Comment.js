import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div>
      <p><strong>{comment.username}</strong>: {comment.text}</p>
      <p><small>{new Date(comment.timestamp).toLocaleString()}</small></p>
    </div>
  );
};

export default Comment;
