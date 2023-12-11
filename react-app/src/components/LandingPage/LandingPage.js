// import React, { useState, useEffect } from 'react';

// // const LandingPage = () => {
// //   const [topicOfTheDay, setTopicOfTheDay] = useState(null);

// //   useEffect(() => {
// //     // Fetch the Topic of the Day
// //     const fetchTopicOfTheDay = async () => {
// //       const response = await fetch('/api/topics/topic-of-the-day');
// //       if (response.ok) {
// //         const data = await response.json();
// //         setTopicOfTheDay(data);
// //       }
// //     };

// //     fetchTopicOfTheDay();
// //   }, []);

// const LandingPage = () => {
//     const dispatch = useDispatch();
//     const topicOfTheDay = useSelector(state => state.topics.topicOfTheDay);
//     const comments = useSelector(state => Object.values(state.topics.comments));

//     useEffect(() => {
//         dispatch(fetchTopicOfTheDay());
//     }, [dispatch]);

//     useEffect(() => {
//         if (topicOfTheDay) {
//             dispatch(fetchCommentsForTopic(topicOfTheDay.id));
//         }
//     }, [dispatch, topicOfTheDay]);

//   return (
//     <div>
//       <h1>Topic of the Day</h1>
//       {topicOfTheDay ? (
//         <div>
//           <h2>{topicOfTheDay.title}</h2>
//           <p>{topicOfTheDay.description}</p>
//           {/* Add more content such as comments here */}
//         </div>
//       ) : (
//         <p>Loading topic...</p>
//       )}
//     </div>
//   );
// };

// export default LandingPage;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopicOfTheDay, fetchCommentsForTopic } from '../../store/topics';
const LandingPage = () => {
    const dispatch = useDispatch();
    const topicOfTheDay = useSelector(state => state.topics.topicOfTheDay);
    const comments = useSelector(state => Object.values(state.topics.comments));

    useEffect(() => {
        dispatch(fetchTopicOfTheDay());
    }, [dispatch]);

    useEffect(() => {
        if (topicOfTheDay) {
            dispatch(fetchCommentsForTopic(topicOfTheDay.id));
        }
    }, [dispatch, topicOfTheDay]);

  return (
    <div>
      <h1>Topic of the Day</h1>
      {topicOfTheDay ? (
        <div>
          <h2>{topicOfTheDay.title}</h2>
          <p>{topicOfTheDay.description}</p>
          {/* You can map over the comments here to display them */}
          <div>
            {comments.slice(0, 2).map(comment => (
              <p key={comment.id}>{comment.content}</p>
            ))}
          </div>
          <a href="/comments">See all comments</a>
        </div>
      ) : (
        <p>Loading topic...</p>
      )}
    </div>
  );
};

export default LandingPage;
