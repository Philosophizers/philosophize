// src/store/topics.js


const GET_TOPICS = 'topics/GET_TOPICS';
const CREATE_TOPIC = 'topics/CREATE_TOPIC';
const REMOVE_TOPIC = 'topics/REMOVE_TOPIC';
const UPDATE_TOPIC = 'topics/UPDATE_TOPIC';
const SET_TOPIC_OF_THE_DAY = 'topics/SET_TOPIC_OF_THE_DAY';
const GET_COMMENTS = 'topics/GET_COMMENTS';
const ADD_COMMENT = 'topics/ADD_COMMENT';


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

// Thunk for posting a new comment (if needed)
// ...

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
      
      default:
          return state;
  }
}