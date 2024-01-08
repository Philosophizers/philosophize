// src/store/topics.js

const GET_TOPICS = "topics/GET_TOPICS";
const CREATE_TOPIC = "topics/CREATE_TOPIC";
const REMOVE_TOPIC = "topics/REMOVE_TOPIC";
const UPDATE_TOPIC = "topics/UPDATE_TOPIC";
const SET_TOPIC_OF_THE_DAY = "topics/SET_TOPIC_OF_THE_DAY";
const GET_COMMENTS = "topics/GET_COMMENTS";
const ADD_COMMENT = "topics/ADD_COMMENT";
const VOTE_FOR_TOPIC = "topics/VOTE_FOR_TOPIC";
const UNVOTE_FOR_TOPIC = "topics/UNVOTE_FOR_TOPIC";
const RESET_VOTES = "topics/RESET_VOTES";
const USER_HAS_VOTED = "topics/USER_HAS_VOTED";

const UPDATE_COMMENT = "topics/UPDATE_COMMENT";
const DELETE_COMMENT = "topics/DELETE_COMMENT";


// Action Creators
const getTopics = (topics) => ({
  type: GET_TOPICS,
  topics,
});

export const addTopic = (topic) => ({
  type: CREATE_TOPIC,
  topic,
});

// Thunk Action Creators
export const fetchTopics = () => async (dispatch) => {
  const response = await fetch("/api/topics");
  if (response.ok) {
    const topics = await response.json();
    dispatch(getTopics(topics));
  }
};

// export const fetchTopics = () => async (dispatch) => {
//   const response = await fetch("/api/topics");
//   if (response.ok) {
//     let topics = await response.json();
//     // Assuming each topic has a 'created_at' field
//     topics = topics.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//     dispatch(getTopics(topics));
//   }
// };


export const updateTopic = (topic) => ({
  type: UPDATE_TOPIC,
  topic,
});

export const editTopic = (topicId, topicData) => async (dispatch) => {
  const response = await fetch(`/api/topics/${topicId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(topicData),
    credentials: "include",
  });

  if (response.ok) {
    const updatedTopic = await response.json();
    dispatch(updateTopic(updatedTopic));
    return updatedTopic;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const removeTopic = (topicId) => ({
  type: REMOVE_TOPIC,
  topicId,
});

export const createTopic = (topicData) => async (dispatch) => {
  const response = await fetch("/api/topics/banana", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(topicData),
    // body: formInfo
  });

  if (response.ok) {
    const newTopic = await response.json();
    dispatch(addTopic(newTopic));
    return newTopic;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createComment = (topicId, commentData) => async (dispatch) => {
  const response = await fetch(`/api/comments/${topicId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
    // body: formInfo
  });

  if (response.ok) {
    console.log('comment created', response)
  } else {
    const errors = await response.json();
    return errors;
  }
};

// Add new action creators
export const setTopicOfTheDay = (topic) => ({
  type: SET_TOPIC_OF_THE_DAY,
  topic,
});

export const getComments = (comments) => ({
  type: GET_COMMENTS,
  comments,
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

// export const voteForTopic = (topicId) => ({
//   type: VOTE_FOR_TOPIC,
//   topicId,
// });

export const voteForTopic = (updatedTopic) => ({
  type: VOTE_FOR_TOPIC,
  topic: updatedTopic,
});

export const unvoteForTopic = (updatedTopic) => ({
  type: UNVOTE_FOR_TOPIC,
  topic: updatedTopic,
});

// Thunk for fetching the topic of the day
export const fetchTopicOfTheDay = () => async (dispatch) => {
  const response = await fetch("/api/topics/topic-of-the-day");
  if (response.ok) {
    const topic = await response.json();
    dispatch(setTopicOfTheDay(topic));
  }
};


//comments

export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

export const userHasVotedStatus = (hasVoted) => ({
  type: USER_HAS_VOTED,
  hasVoted,
});


// Thunk for fetching comments of the topic of the day
export const fetchCommentsForTopic = (topicId) => async (dispatch) => {
  console.log('fetchCommentsForTopic', topicId)
  const response = await fetch(`/api/comments/${topicId}`);
  if (response.ok) {
    const comments = await response.json();
    dispatch(getComments(comments));
  }
};

// export const castVote = (topicId) => async (dispatch) => {
//   const response = await fetch(`/api/topics/${topicId}/vote`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     // Make sure to include credentials if your API requires authentication
//     credentials: 'include',
//   });

//   if (response.ok) {
//     dispatch(voteForTopic(topicId));
//   } else {
//     // Handle errors, e.g., user has already voted
//     const data = await response.json();
//     alert(data.message); // Or handle the error message in a more user-friendly way
//   }
// };

export const castVote = (topicId) => async (dispatch) => {
  const response = await fetch(`/api/topics/${topicId}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (response.ok) {
    const updatedTopic = await response.json();
    console.log("Updated Topic:", updatedTopic); // Log to check the updated topic
    dispatch(voteForTopic(updatedTopic));
    dispatch(checkUserVote());
  } else {
    const data = await response.json();
    alert(data.message);
  }
};

export const checkUserVote = () => async (dispatch) => {
  try {
    const response = await fetch('/api/votes/check-vote', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      const hasVoted = data.has_voted;
      console.log('Has the user voted?', hasVoted);
      dispatch(userHasVotedStatus(hasVoted));
    } else {
      const errorData = await response.json();
      // Handle error case, maybe show an alert or log the error
      console.error('Error:', errorData.message);
    }
  } catch (error) {
    // Handle any network errors or exceptions
    console.error('Network Error:', error);
  }
};

export const removeVote = (topicId) => async (dispatch) => {
  const response = await fetch(`/api/topics/${topicId}/unvote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Make sure to include credentials if your API requires authentication
    credentials: "include",
  });

  if (response.ok) {
    const updatedTopic = await response.json();
    dispatch(unvoteForTopic(updatedTopic));
    dispatch(checkUserVote());
  } else {
    // Handle errors
    const data = await response.json();
    alert(data.message); // Or handle the error message in a more user-friendly way
  }
};

export const editComment = (commentId, commentData) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  });

  if (response.ok) {
    const updatedComment = await response.json();
    dispatch(updateComment(updatedComment));
    return updatedComment;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const removeComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteComment(commentId));
  } else {
    const errors = await response.json();
    return errors;
  }
};


// Adjust the initial state
const initialState = {
  topics: {}, // Existing topics state
  topicOfTheDay: null, // New state for Topic of the Day
  comments: {}, // New state for comments
};

// Reducer

// export default function topicsReducer(state = initialState, action) {
//   switch (action.type) {
//       case GET_TOPICS:
//           const topicsNormalized = {};
//           action.topics.forEach(topic => {
//               topicsNormalized[topic.id] = topic;
//           });
//           return { ...state, ...topicsNormalized };
//       case CREATE_TOPIC:
//           return { ...state, [action.topic.id]: action.topic };
//       default:
//           return state;
//   }
// }

export default function topicsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOPICS:
      return {
        ...state,
        ...Object.fromEntries(action.topics.map((topic) => [topic.id, topic])),
      };
    // case CREATE_TOPIC:
    //   return { ...state, [action.topic.id]: action.topic };
    case CREATE_TOPIC:
      return {
        ...state,
        topics: {
          [action.topic.id]: action.topic,
          ...state.topics,
        },
      };
    case UPDATE_TOPIC:
      return {
        ...state,
        [action.topic.id]: action.topic,
      };
    case REMOVE_TOPIC:
      const newState = { ...state };
      delete newState[action.topicId];
      return newState;
    case SET_TOPIC_OF_THE_DAY:
      return { ...state, topicOfTheDay: action.topic };
    case GET_COMMENTS:
      return { ...state, comments: { ...action.comments } };
    case ADD_COMMENT:
      // Logic to add a new comment to the state
      return {
        ...state,
        comments: { ...state.comments, [action.comment.id]: action.comment },
      };
    //     case VOTE_FOR_TOPIC:
    //   return {
    //     ...state,
    //     topics: {
    //       ...state.topics,
    //       [action.topicId]: {
    //         ...state.topics[action.topicId],
    //         hasVoted: true
    //       }
    //     }
    //   };
    // case UNVOTE_FOR_TOPIC:
    //   return {
    //     ...state,
    //     topics: {
    //       ...state.topics,
    //       [action.topicId]: {
    //         ...state.topics[action.topicId],
    //         hasVoted: false
    //       }
    //     }
    //   };
    case VOTE_FOR_TOPIC:
      console.log("Action:", action);
      console.log("Current State:", state); // Log current state
      const newTopic = {
        ...state[action.topic.id],
        ...action.topic,
      };
      console.log("ne topic", newTopic);
      const updatedState = {
        ...state,
        [action.topic.id]: newTopic,
      };
      console.log("Updated State:", updatedState); // Log updated state
      return updatedState;

      case USER_HAS_VOTED:
        return {
          ...state,
          hasVoted: action.hasVoted
        };
    case UNVOTE_FOR_TOPIC:
      return {
        ...state,
        [action.topic.id]: {
          ...state[action.topic.id],
          ...action.topic,
          
        },
      };
      case UPDATE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment,
        },
      };
    case DELETE_COMMENT:
      const newComments = { ...state.comments };
      delete newComments[action.commentId];
      return {
        ...state,
        comments: newComments,
      };
    default:
      return state;
  }
}
