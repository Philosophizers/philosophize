import React, { useState, useEffect } from "react";

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
    let hasErrors = false;

    // Title validation
    if (title.length < 10 || title.length > 250) {
      setTitleError("Title must be between 10 and 250 characters");
      hasErrors = true;
    } else {
      setTitleError("");
    }

    // Description validation
    if (description.length < 50 || description.length > 500) {
      setDescriptionError("Description must be between 50 and 500 characters");
      hasErrors = true;
    } else {
      setDescriptionError("");
    }

    if (
      titleError ||
      descriptionError ||
      title.length === 0 ||
      description.length === 0
    ) {
      // Handle the case when there are errors or fields are empty
      return;
    }

    if (hasErrors) return;

    const topicData = { title, description };
    onSubmit(topicData);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //     <div>
    //         <label>Title</label>
    //         <input
    //             type="text"
    //             value={title}
    //             onChange={(e) => setTitle(e.target.value)}
    //         />
    //         {errors.title && <p>{errors.title}</p>}
    //     </div>
    //     <div>
    //         <label>Description</label>
    //         <textarea
    //             value={description}
    //             onChange={(e) => setDescription(e.target.value)}
    //         />
    //         {errors.description && <p>{errors.description}</p>}
    //     </div>
    //     <button type="submit">{existingTopic ? 'Update Topic' : 'Create Topic'}</button>
    //     {existingTopic && <button type="button" onClick={onCancel}>Cancel</button>}
    // </form>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <p className="error">{titleError}</p>}
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {descriptionError && <p className="error">{descriptionError}</p>}
      </div>
      {/* <button type="submit">{existingTopic ? 'Update Topic' : 'Create Topic'}</button>
  {existingTopic && <button type="button" onClick={onCancel}>Cancel</button>} */}
      <button type="submit">
        {mode === "edit" ? "Update Topic" : "Create Topic"}
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default TopicForm;
