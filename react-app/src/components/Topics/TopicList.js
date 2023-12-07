// import React, { useState, useEffect } from 'react';
// import Topic from './Topic';


// const TopicList = () => {
//     const [topics, setTopics] = useState([]);
  
//     useEffect(() => {
//       const fetchTopics = async () => {
//         try {
//           const response = await fetch('/api/topics'); // Adjust the URL based on your API endpoint
//           if (!response.ok) throw new Error('Network response was not ok');
//           const data = await response.json();
//           setTopics(data); // Make sure the key matches what your backend sends
//         } catch (error) {
//           console.error('Error fetching topics:', error);
//         }
//       };
  
//       fetchTopics();
//     }, []);

//     return (
//         <div>
//           <h1>Topics</h1>
//           <ul>
//             {topics.length > 0 ? (
//               topics.map(topic => (
//                 <Topic key={topic.id} topic={topic} />
//               ))
//             ) : (
//               <p>Loading topics...</p>
//             )}
//           </ul>
//         </div>
//       );

//     };
      

// export default TopicList;































// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import Topic from './Topic';
// import TopicForm from './TopicForm';
// import { addTopic } from '../../store/topics';

// const TopicList = () => {
//   const [topics, setTopics] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingTopic, setEditingTopic] = useState(null);

//   useEffect(() => {
//     fetchTopics();
//   }, []);

//   const fetchTopics = async () => {
//     try {
//       const response = await fetch('/api/topics', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include', // Include cookies with the request
//       });
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
//       setTopics(data);
//     } catch (error) {
//       console.error('Error fetching topics:', error);
//     }
//   };
  
  
  

//   const dispatch = useDispatch();

// const handleCreateOrUpdateTopic = async (topicData) => {
//     // Determine the HTTP method and URL based on whether we are creating or updating a topic
//     const method = editingTopic ? 'PUT' : 'POST';
//     const url = editingTopic ? `/api/topics/${editingTopic.id}` : '/api/topics';
  
//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(topicData),
//         credentials: 'include',
//       });
//       if (!response.ok) throw new Error('Network response was not ok');
  
//       const returnedTopic = await response.json();
  
//       if (!editingTopic) {
//         // Dispatch the Redux action here for adding a new topic
//         dispatch(addTopic(returnedTopic));
//       } else {

//       }
  
//       setShowForm(false);
//       setEditingTopic(null);
//       fetchTopics();  // Refresh the list of topics
//     } catch (error) {
//       console.error('Error submitting topic:', error);
//     }
//   };
  

//   const handleDeleteTopic = async (topicId) => {
//     try {
//       const response = await fetch(`/api/topics/${topicId}`, { method: 'DELETE' });
//       if (!response.ok) throw new Error('Network response was not ok');
//       fetchTopics();  // Refresh the list of topics
//     } catch (error) {
//       console.error('Error deleting topic:', error);
//     }
//   };

//   const handleEditClick = (topic) => {
//     setEditingTopic(topic);
//     setShowForm(true);
//   };

//   return (
//     <div>
//       <h1>Topics</h1>
//       <button onClick={() => setShowForm(true)}>Create New Topic</button>
//       {showForm && (
//         <TopicForm
//           existingTopic={editingTopic}
//           onSubmit={handleCreateOrUpdateTopic}
//           onCancel={() => {
//             setShowForm(false);
//             setEditingTopic(null);
//           }}
//         />
//       )}
//       <ul>
//         {topics.length > 0 ? (
//           topics.map(topic => (
//             <Topic
//               key={topic.id}
//               topic={topic}
//               onEdit={handleEditClick}
//               onDelete={handleDeleteTopic}
//             />
//           ))
//         ) : (
//           <p>Loading topics...</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default TopicList;












import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topic from './Topic';
import TopicForm from './TopicForm';
import { fetchTopics } from '../../store/topics'; // Import the fetchTopics action

const TopicList = () => {
    const dispatch = useDispatch();
    const topics = useSelector(state => Object.values(state.topics)); // Accessing topics from Redux store
    const [showForm, setShowForm] = useState(false);
    const [editingTopic, setEditingTopic] = useState(null);

    useEffect(() => {
        dispatch(fetchTopics()); // Dispatching action to fetch topics
    }, [dispatch]);

    const handleCreateOrUpdateTopic = async (topicData) => {
      // Determine the HTTP method and URL based on whether we are creating or updating a topic
      const method = editingTopic ? 'PUT' : 'POST';
      const url = editingTopic ? `/api/topics/${editingTopic.id}` : '/api/topics';
    
      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(topicData),
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Network response was not ok');
    
        const returnedTopic = await response.json();
    
        if (!editingTopic) {
          // Dispatch the Redux action here for adding a new topic
          dispatch(fetchTopics(returnedTopic));
        } else {
  
        }
    
        setShowForm(false);
        setEditingTopic(null);
        fetchTopics();  // Refresh the list of topics
      } catch (error) {
        console.error('Error submitting topic:', error);
      }
    };
    
  
    const handleDeleteTopic = async (topicId) => {
      try {
        const response = await fetch(`/api/topics/${topicId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Network response was not ok');
        fetchTopics();  // Refresh the list of topics
      } catch (error) {
        console.error('Error deleting topic:', error);
      }
    };

    const handleEditClick = (topic) => {
      setEditingTopic(topic);
      setShowForm(true);
  };
  

    return (
        <div>
            <h1>Topics</h1>
            <button onClick={() => setShowForm(true)}>Create New Topic</button>
            {showForm && (
    <TopicForm
        existingTopic={editingTopic}
        onSubmit={handleCreateOrUpdateTopic}
        onCancel={() => {
            setShowForm(false);
            setEditingTopic(null);
        }}
    />
)}

            <ul>
                {topics.length > 0 ? (
                    topics.map(topic => (
                        <Topic
                            key={topic.id}
                            topic={topic}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteTopic}
                        />
                    ))
                ) : (
                    <p>Loading topics...</p>
                )}
            </ul>
        </div>
    );
};

export default TopicList;
