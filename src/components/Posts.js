import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import Post from './Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.map(post => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Posts;
