import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Topic from "./Topic";
import TopicForm from "./TopicForm";
import {
  fetchTopics,
  editTopic,
  createTopic,
  removeTopic,
  checkUserVote,
} from "../../store/topics";
import { castVote, removeVote } from "../../store/topics";
import "./topic.css";

const TopicList = () => {
  const dispatch = useDispatch();
  const topics = useSelector((state) => Object.values(state.topics));
  // let topics = useSelector((state) => state.topics);
  // topics = Object.values(topics);
  const user = useSelector((state) => state.session.user);
  const [showForm, setShowForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null); // maybe change out of null

  const topicsObject = useSelector((state) => state.topics);
  const topicsArray = topicsObject && Object.values(topicsObject);

  const sortedTopics = topicsArray.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));

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
        console.error("Failed to create topic:", res.errors);
      }
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };

  //need to push newest topic to top of list

  const handleEditTopic = async (topicData) => {
    try {
      const res = await dispatch(editTopic(editingTopic.id, topicData));
      if (!res.errors) {
        setShowForm(false);
        setEditingTopic(null);
        dispatch(fetchTopics());
      } else {
        console.error("Failed to update topic:", res.errors);
      }
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  // you can do this without having to dispathc fetchTopics again

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
      const response = await fetch(`/api/topics/${topicId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Network response was not ok");
      dispatch(removeTopic(topicId));
      // Wait for state update before trying to re-render the topics list
      await dispatch(fetchTopics());
    } catch (error) {
      console.error("Error deleting topic:", error);
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
    console.error("Expected topics to be an array but got:", topics);
    return <p>Error: Topics data is not an array.</p>;
  }

  // return (
  //   <>
  //     <div>
  //       <div>
  //         <h1>Topics</h1>
  //         <button
  //           onClick={() => {
  //             setShowForm(true);
  //             setEditingTopic(null); // Reset editing topic
  //           }}
  //         >
  //           Create New Topic
  //         </button>
  //       </div>
  //       <div>
  //         {showForm && (
  //           <TopicForm
  //             existingTopic={editingTopic}
  //             onSubmit={editingTopic ? handleEditTopic : handleCreateTopic}
  //             onCancel={() => {
  //               setShowForm(false);
  //               setEditingTopic(null);
  //             }}
  //           />
  //         )}
  //       </div>

  //       <div>
  //         <ul>
  //           {topics &&
  //             topics.length > 0 &&
  //             topics.map((topic) => (
  //               <Topic
  //                 key={topic ? topic.id : undefined}
  //                 topic={topic}
  //                 onEdit={handleEditClick}
  //                 onDelete={handleDeleteTopic}
  //                 onVote={handleVote}
  //                 onUnvote={handleUnvote}
  //                 userOwns={topic?.user_id === user?.id}
  //               />
  //             ))}
  //         </ul>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div>
        <div>
          <h1>Topics</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingTopic(null); // Reset editing topic
            }}
          >
            Create New Topic
          </button>
        </div>
        <div>
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
        </div>
  
        <div>
          <ul>
            {sortedTopics.length > 0 && sortedTopics.map((topic) => (
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
      </div>
    </>
  );
  
};

export default TopicList;
