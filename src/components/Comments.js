import React, { useEffect, useState } from 'react';
import { fetchComments } from '../api';
import Comment from './Comment';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments()
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the comments!", error);
      });
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      {comments.length > 0 ? (
        comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default Comments;
