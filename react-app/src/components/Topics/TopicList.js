// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Topic from './Topic';
// import TopicForm from './TopicForm';
// import { fetchTopics, editTopic, createTopic, removeTopic } from '../../store/topics';
// import { castVote, removeVote } from '../../store/topics';

// const TopicList = () => {
//     const dispatch = useDispatch();
//     const topics = useSelector(state => Object.values(state.topics));
//     const [showForm, setShowForm] = useState(false);
//     const [editingTopic, setEditingTopic] = useState(null);


//     const [votecheck, voteChecked] = useState({
//       topicID: null, 
//       vote: 0,
//       });

//     useEffect(() => {
//       dispatch(fetchTopics()).catch(console.error);
//     }, [dispatch]);

//     const handleCreateTopic = async (topicData) => {
//         try {
//             const res = await dispatch(createTopic(topicData));
//             if (!res.errors) {
//                 setShowForm(false);
//                 dispatch(fetchTopics());
//             } else {
//                 console.error('Failed to create topic:', res.errors);
//             }
//         } catch (error) {
//             console.error('Error creating topic:', error);
//         }
//     };

//     const handleEditTopic = async (topicData) => {
//         try {
//             const res = await dispatch(editTopic(editingTopic.id, topicData));
//             if (!res.errors) {
//                 setShowForm(false);
//                 setEditingTopic(null);
//                 dispatch(fetchTopics());
//             } else {
//                 console.error('Failed to update topic:', res.errors);
//             }
//         } catch (error) {
//             console.error('Error updating topic:', error);
//         }
//     };

//     // const handleDeleteTopic = async (topicId) => {
//     //     try {
//     //         const response = await fetch(`/api/topics/${topicId}`, { method: 'DELETE' });
//     //         if (!response.ok) throw new Error('Network response was not ok');
//     //         dispatch(removeTopic(topicId));
//     //     } catch (error) {
//     //         console.error('Error deleting topic:', error);
//     //     }
//     // };

//     const handleDeleteTopic = async (topicId) => {
//       try {
//         const response = await fetch(`/api/topics/${topicId}`, { method: 'DELETE' });
//         if (!response.ok) throw new Error('Network response was not ok');
//         dispatch(removeTopic(topicId));
//         // Wait for state update before trying to re-render the topics list
//         await dispatch(fetchTopics());
//       } catch (error) {
//         console.error('Error deleting topic:', error);
//       }
//     };
    


//     const handleEditClick = (topic) => {
//         setEditingTopic(topic);
//         setShowForm(true);
//     };

//     const handleVote = (topicId) => {
//       count = 0;
//       voteChecked((topicId), count++);
//     };
  
//     const handleUnvote = (topicId) => {
//       count = 1;
//       voteChecked((topicId), count--);
//     };

//     if (!topics || topics.length === 0) {
//       return <p>Loading topics...</p>;
//     }


//     if (!Array.isArray(topics)) {
//       console.error('Expected topics to be an array but got:', topics);
//       return <p>Error: Topics data is not an array.</p>;
//     }
    

//     topics.map(topic => {
//       if (!topic) {
//         console.error('Null or undefined topic found', topic);
//         return null; // or some placeholder component
//       }
//       const hasVoted = topic.hasVoted ?? false;
//       return (
//         <Topic
//         key={topic.id}
//         topic={topic}
//         onEdit={handleEditClick}
//         onDelete={handleDeleteTopic}
//         onVote={() => handleVote(topic.id)}
//         onUnvote={() => handleUnvote(topic.id)}
//         hasVoted={hasVoted}
//         />
//       );
//     })
    

    

//     return (
//         <div>
//             <h1>Topics</h1>
//             <button onClick={() => {
//               setShowForm(true);
//               setEditingTopic(null); // Reset editing topic
//             }}>
//               Create New Topic
//             </button>
//             {showForm && (
//                 <TopicForm
//                     existingTopic={editingTopic}
//                     onSubmit={editingTopic ? handleEditTopic : handleCreateTopic}
//                     onCancel={() => {
//                         setShowForm(false);
//                         setEditingTopic(null);
//                     }}
//                 />
//             )}

//             {/* <ul>
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
//             </ul> */}

// <ul>
//   {topics && topics.length > 0 && topics.map(topic => (
//     <Topic
//       key={topic ? topic.id : undefined}
//       topic={topic}
//       onEdit={handleEditClick}
//       onDelete={handleDeleteTopic}
//       onVote={handleVote}
//       onUnvote={handleUnvote}
//     />
//   ))}
// </ul>

//         </div>
//     );
// };

// export default TopicList;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topic from './Topic';
import TopicForm from './TopicForm';
import { fetchTopics, editTopic, createTopic, removeTopic, checkUserVote } from '../../store/topics';
import { castVote, removeVote } from '../../store/topics';

const TopicList = () => {
    const dispatch = useDispatch();
    const topics = useSelector(state => Object.values(state.topics));
    const user = useSelector((state) => state.session.user);
    const [showForm, setShowForm] = useState(false);
    const [editingTopic, setEditingTopic] = useState(null);

    useEffect(() => {
      dispatch(checkUserVote());
    }, []);

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

    const handleVote = (topicId) => {

      dispatch(castVote(topicId));

    };
  
    const handleUnvote = (topicId) => {
      dispatch(removeVote(topicId));
    };

    if (!topics || topics.length === 0) {
      return <p>Loading topics...</p>;
    }


    if (!Array.isArray(topics)) {
      console.error('Expected topics to be an array but got:', topics);
      return <p>Error: Topics data is not an array.</p>;
    }
    

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
      onVote={handleVote}
      onUnvote={handleUnvote}
      userOwns={topic?.user_id === user?.id}
    />
  ))}
</ul>

        </div>
    );
};

export default TopicList;

