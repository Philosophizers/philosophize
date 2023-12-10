// src/store/topics.js


const GET_TOPICS = 'topics/GET_TOPICS';
const CREATE_TOPIC = 'topics/CREATE_TOPIC';
const REMOVE_TOPIC = 'topics/REMOVE_TOPIC';
const UPDATE_TOPIC = 'topics/UPDATE_TOPIC';
const SET_TOPIC_OF_THE_DAY = 'topics/SET_TOPIC_OF_THE_DAY';
const GET_COMMENTS = 'topics/GET_COMMENTS';
const ADD_COMMENT = 'topics/ADD_COMMENT';
const VOTE_FOR_TOPIC = 'topics/VOTE_FOR_TOPIC';
const UNVOTE_FOR_TOPIC = 'topics/UNVOTE_FOR_TOPIC';
const RESET_VOTES = 'topics/RESET_VOTES';


// Action Creators
const getTopics = (topics) => ({
    type: GET_TOPICS,
    topics
});

export const addTopic = (topic) => ({
    type: CREATE_TOPIC,
    topic
});

// Thunk Action Creators
export const fetchTopics = () => async (dispatch) => {
  const response = await fetch('/api/topics');
  if (response.ok) {
    const topics = await response.json();
    dispatch(getTopics(topics));
  }
};

export const updateTopic = (topic) => ({
  type: UPDATE_TOPIC,
  topic
});

export const editTopic = (topicId, topicData) => async (dispatch) => {
  const response = await fetch(`/api/topics/${topicId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(topicData),
      credentials: 'include',
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
  topicId
});


export const createTopic = (topicData) => async (dispatch) => {
    const response = await fetch('/api/topics/banana', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(topicData)
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

// Add new action creators
export const setTopicOfTheDay = (topic) => ({
  type: SET_TOPIC_OF_THE_DAY,
  topic
});

export const getComments = (comments) => ({
  type: GET_COMMENTS,
  comments
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});



// export const voteForTopic = (topicId) => ({
//   type: VOTE_FOR_TOPIC,
//   topicId,
// });

export const voteForTopic = (updatedTopic) => ({
  type: VOTE_FOR_TOPIC,
  topic: updatedTopic,
});

export const unvoteForTopic = (topicId) => ({
  type: UNVOTE_FOR_TOPIC,
  topicId,
});


// Thunk for fetching the topic of the day
export const fetchTopicOfTheDay = () => async (dispatch) => {
  const response = await fetch('/api/topics/topic-of-the-day');
  if (response.ok) {
      const topic = await response.json();
      dispatch(setTopicOfTheDay(topic));
  }
};

// Thunk for fetching comments of the topic of the day
export const fetchCommentsForTopic = (topicId) => async (dispatch) => {
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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  });

  if (response.ok) {
    const updatedTopic = await response.json();
    console.log("Updated Topic:", updatedTopic); // Log to check the updated topic
    dispatch(voteForTopic(updatedTopic));
  } else {
    const data = await response.json();
    alert(data.message);
  }
};



export const removeVote = (topicId) => async (dispatch) => {
  const response = await fetch(`/api/topics/${topicId}/unvote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // Make sure to include credentials if your API requires authentication
    credentials: 'include',
  });

  if (response.ok) {
    dispatch(unvoteForTopic(topicId));
  } else {
    // Handle errors
    const data = await response.json();
    alert(data.message); // Or handle the error message in a more user-friendly way
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
          return { ...state, ...Object.fromEntries(action.topics.map(topic => [topic.id, topic])) };
      case CREATE_TOPIC:
          return { ...state, [action.topic.id]: action.topic };
      case UPDATE_TOPIC:
            return {
                ...state,
                [action.topic.id]: action.topic
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
            return { ...state, comments: { ...state.comments, [action.comment.id]: action.comment } };
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
    console.log("Current State:", state); // Log current state
    const updatedState = {
      ...state,
      topics: {
        ...state.topics,
        [action.topic.id]: {
          ...state.topics[action.topic.id],
          ...action.topic
        }
      }
    };
    console.log("Updated State:", updatedState); // Log updated state
    return updatedState;

  case UNVOTE_FOR_TOPIC:
    return {
      ...state,
      topics: {
        ...state.topics,
        [action.topicId]: {
          ...state.topics[action.topicId],
          hasVoted: false,
          vote_count: state.topics[action.topicId].vote_count - 1 // Decrement vote count
        }
      }
    };
      default:
          return state;
  }
}