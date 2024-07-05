import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGroups, deleteGroup, createGroupArticle } from "../api";
import { getUserId } from "../auth";

const GroupDetail = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
  });
  const currentUserId = getUserId();

  useEffect(() => {
    fetchGroups(groupId)
      .then((response) => {
        setGroup(response.data);
        setArticles(response.data.articles); // Assuming articles are part of group data
      })
      .catch((error) => {
        console.error("Error fetching group details:", error);
      });
  }, [groupId]);

  const handleDeleteGroup = () => {
    deleteGroup(groupId)
      .then(() => {
        console.log("Group deleted successfully");
        // Additional logic after deletion if needed
      })
      .catch((error) => {
        console.error("Error deleting group:", error);
      });
  };

  const handleCreateArticle = () => {
    createGroupArticle(groupId, newArticle)
      .then((response) => {
        setArticles([...articles, response.data]); // Assuming response.data contains the newly created article
        setNewArticle({ title: "", content: "" }); // Clear input fields after successful creation
      })
      .catch((error) => {
        console.error("Error creating article:", error);
      });
  };

  if (!group) {
    return <p>Loading...</p>;
  }

  return (
    <div className="group-detail">
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      {group.admin_id === currentUserId && (
        <button onClick={handleDeleteGroup}>Delete Group</button>
      )}

      <div>
        <h3>Group Articles</h3>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={newArticle.title}
            onChange={(e) =>
              setNewArticle({ ...newArticle, title: e.target.value })
            }
          />
          <textarea
            placeholder="Content"
            value={newArticle.content}
            onChange={(e) =>
              setNewArticle({ ...newArticle, content: e.target.value })
            }
          />
          <button onClick={handleCreateArticle}>Create Article</button>
        </div>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="article-card">
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </div>
          ))
        ) : (
          <p>No articles available</p>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
