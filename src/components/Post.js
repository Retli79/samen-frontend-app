import React from "react";
import Comment from "./Comment";
import "./Post.css";

const Post = ({ post }) => {
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
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </div>
  );
};

export default Post;
