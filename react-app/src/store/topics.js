// src/store/topics.js


const GET_TOPICS = 'topics/GET_TOPICS';
const CREATE_TOPIC = 'topics/CREATE_TOPIC';

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
    console.log("i am here!!")
};

// Reducer
const initialState = {};

export default function topicsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOPICS:
            return { ...state, ...action.topics };
        case CREATE_TOPIC:
            return { ...state, [action.topic.id]: action.topic };
        default:
            return state;
    }
}
