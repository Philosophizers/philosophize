import React, { useState, useEffect } from 'react';

const TopicForm = ({ existingTopic, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(existingTopic ? existingTopic.title : '');
    const [description, setDescription] = useState(existingTopic ? existingTopic.description : '');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (existingTopic) {
            setTitle(existingTopic.title);
            setDescription(existingTopic.description);
        }
    }, [existingTopic]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = [];

        // Validation logic here if needed

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        const topicData = { title, description };
        onSubmit(topicData); // Call the passed onSubmit function
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <p>{errors.title}</p>}
            </div>
            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p>{errors.description}</p>}
            </div>
            <button type="submit">{existingTopic ? 'Update Topic' : 'Create Topic'}</button>
            {existingTopic && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
};

export default TopicForm;
