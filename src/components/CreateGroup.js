import React, { useState } from "react";
import { createGroup } from "../api";

const CreateGroup = ({ onGroupCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { name, description });
    const groupData = { name, description };
    createGroup(groupData)
      .then((response) => {
        console.log("Group created successfully:", response.data);
        onGroupCreated(response.data);
        setName("");
        setDescription("");
      })
      .catch((error) => {
        console.error("There was an error creating the group!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Group Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Group Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Create Group</button>
    </form>
  );
};

export default CreateGroup;
