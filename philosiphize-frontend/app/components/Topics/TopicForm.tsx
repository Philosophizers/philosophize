import React, { useState, useEffect } from "react";
import "./topic.css";

const TopicForm = ({ mode, existingTopic, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(existingTopic ? existingTopic.title : "");
  const [description, setDescription] = useState(
    existingTopic ? existingTopic.description : ""
  );
  const [errors, setErrors] = useState([]);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if (existingTopic) {
      setTitle(existingTopic.title);
      setDescription(existingTopic.description);
    }
  }, [existingTopic]);

  useEffect(() => {
    if (title.length >= 10 && title.length <= 250) {
      setTitleError("");
    } else if (title.length > 0) {
      setTitleError("Title must be between 10 and 250 characters");
    }
  }, [title]);

  useEffect(() => {
    if (description.length >= 50 && description.length <= 500) {
      setDescriptionError("");
    } else if (description.length > 0) {
      setDescriptionError("Description must be between 50 and 500 characters");
    }
  }, [description]);

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     let newErrors = [];

  //     if (newErrors.length > 0) {
  //         setErrors(newErrors);
  //         return;
  //     }

  //     const topicData = { title, description };
  //     onSubmit(topicData); // Call the passed onSubmit function
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = [];
    const topicId = existingTopic ? existingTopic.id : null; // Extract the ID
  const topicData = { title, description }; // Form fields
    if (newErrors.length === 0) {
      onSubmit({ topicId, title, description });  // Pass topicId, title, and description to parent
    }
  
    // Title validation
    if (title.length < 10 || title.length > 250) {
      newErrors.push("Title must be between 10 and 250 characters");
    }
  
    // Description validation
    if (description.length < 50 || description.length > 500) {
      newErrors.push("Description must be between 50 and 500 characters");
    }
  
    setErrors(newErrors);
  
    if (newErrors.length === 0 && topicId !== null) {
      onSubmit(topicId, topicData); // Pass topicId and topicData separately
    }
  };


  return (
    <form onSubmit={handleSubmit} className="topic-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          id="title"
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <p className="error-message">{titleError}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {descriptionError && <p className="error-message">{descriptionError}</p>}
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">
          {mode === "edit" ? "Update Topic" : "Create Topic"}
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TopicForm;
