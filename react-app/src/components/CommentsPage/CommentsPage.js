import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import {
  fetchTopicOfTheDay,
  createComment,
  editComment,
  removeComment,
  fetchCommentsForTopic,
} from "../../store/topics";
import ConfirmationModal from "../Topics/TopicDeleteConfirm";
import thethinker from "./thethinker.png";
import "./CommentsPage.css";

const CommentsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const topicOfTheDay = useSelector((state) => state.topics.topicOfTheDay);
  const comments = useSelector((state) => Object.values(state.topics.comments));
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const [editCommentId, setEditCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editingErrors, setEditingErrors] = useState({});
  const user = useSelector((state) => state.session.user);
  const currentUserId = user?.id;

  const [contentError, setContentError] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const { openModal } = useModal();

  useEffect(() => {
    dispatch(fetchTopicOfTheDay());
  }, [dispatch]);

  useEffect(() => {
    if (topicOfTheDay) {
      dispatch(fetchCommentsForTopic(topicOfTheDay.id));
    }
  }, [dispatch, topicOfTheDay]);

  useEffect(() => {
    if (content.length >= 50 && content.length <= 1000) {
      setContentError("");
    } else if (content.length > 1000) {
      setContentError("Max limit of 1000 characters reached");
    } else if (content.length > 0) {
      setContentError("Content must be at least 50 characters");
    }
  }, [content]);

  const handleLoginRedirect = () => {
    history.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contentError || content.length === 0) {
      return;
    }

    const commentData = { content };
    try {
      const res = await dispatch(createComment(topicOfTheDay.id, commentData));
      setContent("");
      dispatch(fetchCommentsForTopic(topicOfTheDay.id));
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };

  const handleEdit = (comment) => {
    setEditCommentId(comment.id);
    setEditedContent(comment.content);
    setEditingErrors({}); // Clear any previous editing errors
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditedContent("");
    setEditingErrors({}); // Clear any editing errors
  };

  const handleOpenLoginModal = () => {
    openModal("login");
  };

  const handleUpdate = async (commentId) => {
    // Check if the edited content meets the length requirement
    if (editedContent.trim().length < 50) {
      setContentError("Content must be at least 50 characters");
      return; // Stop the update if the content is too short
    }

    // If the content length is valid, clear any previous error messages
    setContentError("");

    try {
      await dispatch(editComment(commentId, { content: editedContent.trim() }));
      setEditCommentId(null); // Reset edit state
      setEditedContent(""); // Clear the edited content state
      dispatch(fetchCommentsForTopic(topicOfTheDay.id)); // Refresh comments
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await dispatch(removeComment(commentId));
      dispatch(fetchCommentsForTopic(topicOfTheDay.id)); // Refresh comments
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteClick = (commentId) => {
    setCommentToDelete(commentId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (commentToDelete) {
      try {
        await dispatch(removeComment(commentToDelete));
        dispatch(fetchCommentsForTopic(topicOfTheDay.id));
        // Reset state and close modal
        setCommentToDelete(null);
        setShowDeleteConfirmation(false);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setCommentToDelete(null);
  };

  return (
    <div className="comments-container">
      {topicOfTheDay ? (
        <>
          <div className="comment-topic">{topicOfTheDay.title}</div>
          <div className="comment-section">
            <img src={thethinker} alt="Topic Image" className="comment-image" />
            {/* {comments.map((comment) => (
              <div key={comment.id} className="comment">
                {editCommentId === comment.id ? (
                  <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                ) : (
                  <p>
                    {comment.username || "User"} said: {comment.content}
                  </p>
                )} */}

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="
comment"
              >
                <div className="comment-info">
                  <span className="comment-username">
                    {comment.username || "User"}
                  </span>
                  <span className="said-landing">said:</span>
                  {editCommentId === comment.id ? (
                    <>
                      <textarea
                        className="comment-edit-textarea"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      ></textarea>
                      {editingErrors[comment.id] && (
                        <div className="error-message">
                          {editingErrors[comment.id]}
                        </div>
                      )}
                      <div className="comment-actions">
                        <button onClick={() => handleUpdate(comment.id)}>
                          Save
                        </button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <span className="comment-content">{comment.content}</span>
                  )}
                </div>
                {currentUserId === comment.user_id && !editCommentId && (
                  <div className="comment-actions">
                    <button onClick={() => handleEdit(comment)}>Edit</button>
                    <div>
                      <ConfirmationModal
                        isOpen={showDeleteConfirmation}
                        onClose={closeDeleteConfirmation}
                        onConfirm={confirmDelete}
                      >
                        Are you sure you want to delete this comment?
                      </ConfirmationModal>
                    </div>
                    <button
                      onClick={() => handleDeleteClick(comment.id)}
                      disabled={currentUserId !== comment.user_id}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {user ? (
            <form onSubmit={handleSubmit} className="new-comment-form">
              <div>
                <label htmlFor="new-comment">Join the Discussion!</label>
                <textarea
                  id="new-comment"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                {contentError && <p className="error">{contentError}</p>}
              </div>
              <button type="submit">Add Comment</button>
            </form>
          ) : (
            <button onClick={handleLoginRedirect} className="login-to-comment">
              Please log in to comment!
            </button>
          )}
        </>
      ) : (
        <p>Loading topic...</p>
      )}
    </div>
  );
};

export default CommentsPage;
