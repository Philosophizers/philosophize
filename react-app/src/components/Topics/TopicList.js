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












// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Topic from './Topic';
// import TopicForm from './TopicForm';
// import { fetchTopics, editTopic, updateTopic, removeTopic } from '../../store/topics'; // Import the fetchTopics action

// const TopicList = () => {
//     const dispatch = useDispatch();
//     const topics = useSelector(state => Object.values(state.topics)); // Accessing topics from Redux store
//     const [showForm, setShowForm] = useState(false);
//     const [editingTopic, setEditingTopic] = useState(null);

//     useEffect(() => {
//         dispatch(fetchTopics()); // Dispatching action to fetch topics
//     }, [dispatch]);

//     const handleCreateOrUpdateTopic = async (topicData) => {
//       // Determine the HTTP method and URL based on whether we are creating or updating a topic
//       const method = editingTopic ? 'PUT' : 'POST';
//       const url = editingTopic ? `/api/topics/${editingTopic.id}` : '/api/topics';
    
//       try {
//         const response = await fetch(url, {
//           method,
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(topicData),
//           credentials: 'include',
//         });
//         if (!response.ok) throw new Error('Network response was not ok');
    
//         const returnedTopic = await response.json();
    
//         if (!editingTopic) {
//           // Dispatch the Redux action here for adding a new topic
//           dispatch(fetchTopics(returnedTopic));
//         } else {
  
//         }
    
//         setShowForm(false);
//         setEditingTopic(null);
//         fetchTopics();  // Refresh the list of topics
//       } catch (error) {
//         console.error('Error submitting topic:', error);
//       }
//     };


// // Inside your component where topic editing is handled
// const handleUpdateTopic = async (topicId, updatedTopicData) => {
//   const result = await dispatch(editTopic(topicId, updatedTopicData));

//   if (!result.errors) {
//       // For example, you could redirect to the topic list page or close the modal/form
//       console.log('Topic updated successfully');
//       // Redirect or update the state to reflect the changes
//   } else {
//       // Show error messages to the user
//       console.error('Failed to update topic:', result.errors);
//   }
// };

    
  
//     // const handleDeleteTopic = async (topicId) => {
//     //   try {
//     //     const response = await fetch(`/api/topics/${topicId}`, { method: 'DELETE' });
//     //     if (!response.ok) throw new Error('Network response was not ok');
    
//     //     // Dispatch fetchTopics again to refresh the list
//     //     dispatch(fetchTopics());
//     //   } catch (error) {
//     //     console.error('Error deleting topic:', error);
//     //   }
//     // };
    

//     const handleDeleteTopic = async (topicId) => {
//       try {
//         const response = await fetch(`/api/topics/${topicId}`, { method: 'DELETE' });
//         if (!response.ok) throw new Error('Network response was not ok');
//         dispatch(removeTopic(topicId));
//       } catch (error) {
//         console.error('Error deleting topic:', error);
//       }
//     };
    

//     const handleEditClick = (topic) => {
//       setEditingTopic(topic);
//       setShowForm(true);
//   };
  

//     return (
//         <div>
//             <h1>Topics</h1>
//             <button onClick={() => setShowForm(true)}>Create New Topic</button>
//             {showForm && (
//     <TopicForm
//         existingTopic={editingTopic}
//         onSubmit={handleCreateOrUpdateTopic}
//         onCancel={() => {
//             setShowForm(false);
//             setEditingTopic(null);
//         }}
//     />
// )}

//             <ul>
//                 {topics.length > 0 ? (
//                     topics.map(topic => (
//                         <Topic
//                             key={topic.id}
//                             topic={topic}
//                             onEdit={handleEditClick}
//                             onDelete={handleDeleteTopic}
//                         />
//                     ))
//                 ) : (
//                     <p>Loading topics...</p>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default TopicList;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topic from './Topic';
import TopicForm from './TopicForm';
import { fetchTopics, editTopic, createTopic, removeTopic } from '../../store/topics';

const TopicList = () => {
    const dispatch = useDispatch();
    const topics = useSelector(state => Object.values(state.topics));
    const [showForm, setShowForm] = useState(false);
    const [editingTopic, setEditingTopic] = useState(null);

    useEffect(() => {
      dispatch(fetchTopics()).catch(console.error);
    }, [dispatch]);

    const handleCreateTopic = async (topicData) => {
        try {
            const res = await dispatch(createTopic(topicData));
            if (!res.errors) {
                setShowForm(false);
                dispatch(fetchTopics());
            } else {
                console.error('Failed to create topic:', res.errors);
            }
        } catch (error) {
            console.error('Error creating topic:', error);
        }
    };

    const handleEditTopic = async (topicData) => {
        try {
            const res = await dispatch(editTopic(editingTopic.id, topicData));
            if (!res.errors) {
                setShowForm(false);
                setEditingTopic(null);
                dispatch(fetchTopics());
            } else {
                console.error('Failed to update topic:', res.errors);
            }
        } catch (error) {
            console.error('Error updating topic:', error);
        }
    };

    // const handleDeleteTopic = async (topicId) => {
    //     try {
    //         const response = await fetch(`/api/topics/${topicId}`, { method: 'DELETE' });
    //         if (!response.ok) throw new Error('Network response was not ok');
    //         dispatch(removeTopic(topicId));
    //     } catch (error) {
    //         console.error('Error deleting topic:', error);
    //     }
    // };

    const handleDeleteTopic = async (topicId) => {
      try {
        const response = await fetch(`/api/topics/${topicId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Network response was not ok');
        dispatch(removeTopic(topicId));
        // Wait for state update before trying to re-render the topics list
        await dispatch(fetchTopics());
      } catch (error) {
        console.error('Error deleting topic:', error);
      }
    };
    


    const handleEditClick = (topic) => {
        setEditingTopic(topic);
        setShowForm(true);
    };

    if (!topics || topics.length === 0) {
      return <p>Loading topics...</p>;
    }


    if (!Array.isArray(topics)) {
      console.error('Expected topics to be an array but got:', topics);
      return <p>Error: Topics data is not an array.</p>;
    }
    

    topics.map(topic => {
      if (!topic) {
        console.error('Null or undefined topic found', topic);
        return null; // or some placeholder component
      }
      return (
        <Topic
          key={topic.id}
          topic={topic}
          onEdit={handleEditClick}
          onDelete={handleDeleteTopic}
        />
      );
    })
    

    

    return (
        <div>
            <h1>Topics</h1>
            <button onClick={() => {
              setShowForm(true);
              setEditingTopic(null); // Reset editing topic
            }}>
              Create New Topic
            </button>
            {showForm && (
                <TopicForm
                    existingTopic={editingTopic}
                    onSubmit={editingTopic ? handleEditTopic : handleCreateTopic}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingTopic(null);
                    }}
                />
            )}

            {/* <ul>
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
            </ul> */}

<ul>
  {topics && topics.length > 0 && topics.map(topic => (
    <Topic
      key={topic ? topic.id : undefined}
      topic={topic}
      onEdit={handleEditClick}
      onDelete={handleDeleteTopic}
    />
  ))}
</ul>

        </div>
    );
};

export default TopicList;
