import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api";
import Post from "./Post";
import CreatePost from "./CreatePost";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post to the top of the list
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts(posts.filter((post) => post.id !== deletedPostId));
  };

  return (
    <div>
      <h1>News feed</h1>
      <CreatePost onPostCreated={handlePostCreated} />
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} onDelete={handlePostDeleted} />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Posts;
