import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUserVote } from "../../store/topics";

function Topic({ topic, onEdit, onDelete, onVote, onUnvote, userOwns }) {
  console.log("topic", topic);
  const user = useSelector((state) => state.session.user);
  console.log("user", user);
  const hasVoted = useSelector((state) => state?.topics?.hasVoted);

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
    <div className="topic">
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>
      <small>Created at: {createdAt}</small>
      <br />
      <small>Last updated: {updatedAt}</small>
      <p>Votes: {voteCount}</p>
      <button onClick={() => onEdit(topic)} disabled={!userOwns}>Edit</button>
      <button onClick={() => onDelete(topic.id)} disabled={!userOwns}>Delete</button>

      {!hasVoted ? (
        <button onClick={() => onVote(topic.id)}>Vote</button>
      ) : (
        <button disabled>Vote</button>
      )}

      {voted && <button onClick={() => onUnvote(topic.id)}>Unvote</button>}
    </div>
  );
}

export default Topic;
