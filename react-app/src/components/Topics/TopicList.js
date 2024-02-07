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
import Modal from "./TopicModal";
import ConfirmationModal from "./TopicDeleteConfirm";

import { useHistory } from "react-router-dom";
import "./topic.css";

const TopicList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const topics = useSelector((state) => Object.values(state.topics));
  // let topics = useSelector((state) => state.topics);
  // topics = Object.values(topics);
  const user = useSelector((state) => state.session.user);
  const [showForm, setShowForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null); // maybe change out of null

  const topicsObject = useSelector((state) => state.topics);
  const topicsArray = topicsObject && Object.values(topicsObject);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState(null);

  const sortedTopics = topicsArray.sort(
    (a, b) => new Date(b?.created_at) - new Date(a?.created_at)
  );

  useEffect(() => {
    dispatch(checkUserVote());
  }, []);

  useEffect(() => {
    dispatch(fetchTopics()).catch(console.error);
  }, [dispatch]);

  // const handleCreateTopic = async (topicData) => {
  //   try {
  //     const res = await dispatch(createTopic(topicData));
  //     if (!res.errors) {
  //       setShowForm(false);
  //       dispatch(fetchTopics());
  //     } else {
  //       console.error("Failed to create topic:", res.errors);
  //     }
  //   } catch (error) {
  //     console.error("Error creating topic:", error);
  //   }
  // };

  const handleLoginRedirect = () => {
    history.push("/login"); // Redirect to login page
  };

  const handleCreateTopic = async (topicData) => {
    try {
      const res = await dispatch(createTopic(topicData));
      if (!res.errors) {
        closeModal(); // Close the modal after successful topic creation
        dispatch(fetchTopics());
      } else {
        console.error("Failed to create topic:", res.errors);
      }
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };

  const handleCreateButtonClick = () => {
    if (!user) {
      alert("You must be logged in to propose a topic");
      return;
    }
    setShowForm(true);
    setEditingTopic(null);
  };

  //need to push newest topic to top of list

  // const handleEditTopic = async (topicData) => {
  //   try {
  //     const res = await dispatch(editTopic(editingTopic.id, topicData));
  //     if (!res.errors) {
  //       setShowForm(false);
  //       setEditingTopic(null);
  //       dispatch(fetchTopics());
  //     } else {
  //       console.error("Failed to update topic:", res.errors);
  //     }
  //   } catch (error) {
  //     console.error("Error updating topic:", error);
  //   }
  // };

  const handleEditTopic = async (topicId, topicData) => {
    try {
      const res = await dispatch(editTopic(topicId, topicData));
      if (!res.errors) {
        closeModal(); // Close the modal after successful topic edit
        dispatch(fetchTopics());
      } else {
        console.error("Failed to update topic:", res.errors);
      }
    } catch (error) {
      console.error("Error updating topic:", error);
      console.log("Received response:", error.response);
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

  const handleDeleteClick = (topic) => {
    // Save the topic to delete and show confirmation modal
    setTopicToDelete(topic);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    // Close the confirmation modal and reset the topic to delete
    setShowDeleteConfirmation(false);
    setTopicToDelete(null);
  };

  const confirmDelete = async () => {
    if (topicToDelete) {
      await handleDeleteTopic(topicToDelete.id);
    }
    closeDeleteConfirmation();
  };

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

  // const handleEditClick = (topic) => {
  //   setEditingTopic(topic);
  //   setShowForm(true);
  // };
  const handleEditClick = (topic) => {
    console.log("Editing topic with ID:", topic.id);  // Ensure this logs the correct ID
    openModal("edit", topic);
  };

  // const handleTopicSubmit = ({ topicId, title, description }) => {
  //   if (topicId) {
  //     // If topicId is present, it's an edit action
  //     dispatch(editTopic(topicId, { title, description }));
  //   } else {
  //     // Handle create topic action
  //   }
  // };
  
  

  const handleVote = (topicId) => {
    if (!user) {
      alert("You must be logged in to vote");
      return;
    }
    dispatch(castVote(topicId));
  };

  const handleUnvote = (topicId) => {
    dispatch(removeVote(topicId));
  };

  // const handleSaveEdit = async (topicId, topicData) => {
  //   // Call the API to save the edited topic, then reset the editing state
  //   const res = await dispatch(editTopic(topicId, topicData));
  //   if (!res.errors) {
  //     setEditingTopic(null); // Exit editing mode
  //   } else {
  //     console.error("Failed to update topic:", res.errors);
  //   }
  // };

  const handleCancelEdit = () => {
    setEditingTopic(null); // Exit editing mode without saving
  };

  if (!topics || topics.length === 0) {
    return <p>Loading topics...</p>;
  }

  if (!Array.isArray(topics)) {
    console.error("Expected topics to be an array but got:", topics);
    return <p>Error: Topics data is not an array.</p>;
  }

  const openModal = (mode, topic = null) => {
    setModalMode(mode);
    setEditingTopic(topic);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTopic(null); // Reset editing topic
  };

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
        <div className="topic-list-container">
          <h1 className="woow">Topics</h1>
          {/* <button
            onClick={() => {
              setShowForm(true);
              setEditingTopic(null); // Reset editing topic
            }}
          >
            Create New Topic
          </button> */}
          {user ? (
            // If user is logged in, show 'Create New Topic' button
            <button
              onClick={() => openModal("create")}
              className="new-topic-form-button"
            >
              Create New Topic
            </button>
          ) : (
            // If user is not logged in, show 'Log in to Propose a New Topic' button
            <button
              onClick={handleLoginRedirect}
              className="login-to-propose-button"
            >
              Log in to Propose a New Topic!
            </button>
          )}
          <div className="vote-describe">
            Vote on a topic you would like to discuss. The topic with the most
            votes by midnight will become tomorrow's Topic of the Day!
          </div>
          <div className="one-vote">
            WARNING: You only get one vote per day, so use it wisely.
          </div>
        </div>
        {/* <div>
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
        </div> */}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <TopicForm
            mode={modalMode}
            existingTopic={editingTopic}
            onSubmit={
              modalMode === "edit" ? handleEditTopic : handleCreateTopic
            }
            onCancel={closeModal}
          />
        </Modal>

        <div>
          <ul>
            {sortedTopics.length > 0 &&
              sortedTopics.map(
                (topic) =>
                  topic && (
                    <Topic
                      key={topic.id}
                      topic={topic}
                      onEdit={handleEditClick}
                      // onDelete={handleDeleteTopic}
                      onDelete={() => handleDeleteClick(topic)}
                      onVote={handleVote}
                      onUnvote={handleUnvote}
                      userOwns={topic?.user_id === user?.id}
                    />
                  )
              )}

            {/* {sortedTopics.length > 0 &&
              sortedTopics.map(
                (
                  topic //console.log the topic here
                ) => (
                  <Topic
                    key={topic ? topic.id : undefined}
                    topic={topic}
                    onEdit={handleEditClick}
                    // onDelete={handleDeleteTopic}
                    onDelete={() => handleDeleteClick(topic)}
                    onVote={handleVote}
                    onUnvote={handleUnvote}
                    userOwns={topic?.user_id === user?.id}
                  />
                )
              )} */}
          </ul>

          <ConfirmationModal
            isOpen={showDeleteConfirmation}
            onClose={closeDeleteConfirmation}
            onConfirm={confirmDelete}
          >
            Are you sure you want to delete your topic proposal?
          </ConfirmationModal>
        </div>
      </div>
    </>
  );
};

export default TopicList;
