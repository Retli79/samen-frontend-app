import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api";
import { isAuthenticated } from "../auth";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import "./Posts.css"; // Import the CSS file

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }
  }, [navigate]);

  useEffect(() => {
    fetchPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  return (
    <div className="posts-page">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Posts;
