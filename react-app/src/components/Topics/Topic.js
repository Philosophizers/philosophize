import React from 'react';
import { useSelector } from 'react-redux';

function Topic({ topic, onEdit, onDelete, onVote, onUnvote }) {
  console.log('topic', topic)
  const user = useSelector(state => state.session.user);
  console.log('user', user);
  if (!topic) {
    console.error('Topic is null or undefined');
    return null;
  }

  const createdAt = new Date(topic.created_at).toLocaleString();
  const updatedAt = new Date(topic.updated_at).toLocaleString();
  const voteCount = topic.vote_count || 0;
  // console.log(`Rendering topic ${topic.id} with vote count:`, voteCount);
  const voted = topic.votes?.some(vote => vote.user_id === user.id)
  return (
    <div className="topic">
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>
      <small>Created at: {createdAt}</small><br />
      <small>Last updated: {updatedAt}</small>
      <p>Votes: {voteCount}</p>
      <button onClick={() => onEdit(topic)}>Edit</button>
      <button onClick={() => onDelete(topic.id)}>Delete</button>

      {!voted ? (
        <button onClick={() => onVote(topic.id)}>Vote</button>
      ) : (
        <button disabled>Vote</button>
      )}

      {voted && (
        <button onClick={() => onUnvote(topic.id)}>Unvote</button>
      )}
    </div>
  );
}

export default Topic;