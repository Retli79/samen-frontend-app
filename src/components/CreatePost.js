import React, { useState } from "react";
import { createPost } from "../api";
import { getUserId } from "../auth";
import "./CreatePost.css";

const CreatePost = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
    image_url_type: "absolute",
    caption: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const owner_id = getUserId();
    if (owner_id) {
      createPost({ ...formData, owner_id })
        .then((response) => {
          onPostCreated(response.data);
          setFormData({
            title: "",
            content: "",
            image_url: "",
            image_url_type: "absolute",
            caption: "",
          });
        })
        .catch((error) => {
          console.error("There was an error creating the post!", error);
        });
    } else {
      console.error("User is not authenticated or userId is not available");
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-heading" onClick={toggleExpansion}>
        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>{" "}
        {/* Example of using Font Awesome icon */}
        <span>What's on your mind?</span>
      </div>
      {isExpanded && (
        <form onSubmit={handleSubmit} className="create-post-form">
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Image URL Type</label>
            <select
              name="image_url_type"
              value={formData.image_url_type}
              onChange={handleChange}
            >
              <option value="absolute">Absolute</option>
              <option value="relative">Relative</option>
            </select>
          </div>
          <div>
            <label>Caption</label>
            <input
              type="text"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Create Post</button>
        </form>
      )}
    </div>
  );
};

export default CreatePost;
