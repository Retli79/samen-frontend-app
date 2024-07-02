import React from 'react';
import Comment from './Comment';

const Post = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.image_url && <img src={post.image_url} alt={post.caption} />}
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
