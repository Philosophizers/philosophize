import React from 'react';

function Topic({ topic, onEdit, onDelete, onVote, onUnvote, hasVoted, userHasVoted, votedTopicId }) {
  if (!topic) {
    console.error('Topic is null or undefined');
    return null;
  }

  const createdAt = new Date(topic.created_at).toLocaleString();
  const updatedAt = new Date(topic.updated_at).toLocaleString();
  const voteCount = topic.vote_count || 0;
  console.log(`Rendering topic ${topic.id} with vote count:`, voteCount);

  return (
    <div className="topic">
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>
      <small>Created at: {createdAt}</small><br />
      <small>Last updated: {updatedAt}</small>
      <p>Votes: {voteCount}</p>
      <button onClick={() => onEdit(topic)}>Edit</button>
      <button onClick={() => onDelete(topic.id)}>Delete</button>

      {!userHasVoted || topic.id === votedTopicId ? (
        <button onClick={() => onVote(topic.id)}>Vote</button>
      ) : (
        <button disabled>Vote</button>
      )}

      {userHasVoted && topic.id === votedTopicId && (
        <button onClick={() => onUnvote(topic.id)}>Unvote</button>
      )}
    </div>
  );
}

export default Topic;