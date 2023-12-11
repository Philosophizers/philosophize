import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicOfTheDay, fetchCommentsForTopic, createComment } from "../../store/topics";
const CommentsPage = () => {
  const dispatch = useDispatch();
  const topicOfTheDay = useSelector((state) => state.topics.topicOfTheDay);
  const comments = useSelector((state) => Object.values(state.topics.comments));
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(fetchTopicOfTheDay());
  }, [dispatch]);

  useEffect(() => {
    if (topicOfTheDay) {
      dispatch(fetchCommentsForTopic(topicOfTheDay.id));
    }
  }, [dispatch, topicOfTheDay]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = [];


    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const commentData = { content };
    try {
      const res = await dispatch(createComment(topicOfTheDay.id, commentData));
      console.log('res', res)
      
        dispatch(fetchCommentsForTopic(topicOfTheDay.id));
      
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };
  return (
    <div>
      <h1>Comments</h1>
      {topicOfTheDay ? (
        <div>
          <div>
            {comments.map((comment) => (
              <p key={comment.id}>{comment.content}</p>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>New Comment</label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && <p>{errors.content}</p>}
            </div>
            <button type="submit">Create Comment</button>
          </form>
        </div>
      ) : (
        <p>Loading topic...</p>
      )}
    </div>
  );
};

export default CommentsPage;
