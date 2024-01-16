import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUserVote } from "../../store/topics";
import "./topic.css";

function Topic({ topic, onEdit, onSaveEdit, onCancelEdit, onDelete, onVote, onUnvote, userOwns }) {
  console.log("topic", topic);
  const user = useSelector((state) => state.session.user);
  console.log("user", user);
  const hasVoted = useSelector((state) => state?.topics?.hasVoted);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(topic ? topic.title : '');
  const [editDescription, setEditDescription] = useState(topic ? topic.description : '');


  const handleSave = () => {
    onSaveEdit(topic.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  // Function to call when cancel button is clicked
  const handleCancel = () => {
    onCancelEdit();
    setIsEditing(false);
  };

  if (!topic) {
    console.error("Topic is null or undefined");
    return null;
  }

  const createdAt = new Date(topic?.created_at)?.toLocaleString();
  const updatedAt = new Date(topic?.updated_at)?.toLocaleString();
  const voteCount = topic?.vote_count || 0;
  // console.log(`Rendering topic ${topic.id} with vote count:`, voteCount);
  const voted = topic?.votes?.some((vote) => vote?.user_id === user?.id);

  return (
    <div className="topic-item">
      <h3 className="topic-title">{topic.title}</h3>
      <p>{topic.description}</p>
      <div className="topic-metadata">
        <small>Created at: {new Date(topic?.created_at).toLocaleString()}</small>
        <br></br>
        <small>Last updated: {new Date(topic?.updated_at).toLocaleString()}</small>
      </div>
      <p>Votes: {topic.vote_count}</p>
      <div className="topic-actions">
        {user && userOwns && (
        <>
        <button className="edit-button" onClick={() => onEdit(topic)} disabled={!userOwns}>Edit</button>
        <button className="delete-button" onClick={() => onDelete(topic.id)} disabled={!userOwns}>Delete</button>
        </>
        )}
        {!hasVoted ? (
        <button onClick={() => onVote(topic.id)}>Vote</button>
      ) : (
        <button disabled>Vote</button>
      )}
        {voted && <button className="unvote-button" onClick={() => onUnvote(topic.id)}>Unvote</button>}
      </div>
    </div>
  );
}

export default Topic;
