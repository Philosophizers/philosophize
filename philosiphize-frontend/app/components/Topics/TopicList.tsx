import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  castVote,
  checkUserVote,
  createTopic,
  editTopic,
  fetchTopics,
  removeTopic,
  removeVote,
} from "../../store/topics";
import Topic from "./Topic";
import ConfirmationModal from "./TopicDeleteConfirm";
import TopicForm from "./TopicForm";
import Modal from "./TopicModal";

import { useHistory } from "react-router-dom";
import "./topic.css";

interface TopicInterface {
  id: number;
  title: string;
  description: string;
  user_id: number;
  created_at: string;
}

const TopicList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const topics = useSelector(({ state }: { state: any }) =>
    Object.values(state.topics)
  );
  // let topics = useSelector((state) => state.topics);
  // topics = Object.values(topics);
  const user = useSelector(({ state }: { state: any }) => state.session.user);
  const [showForm, setShowForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null); // maybe change out of null

  const topicsObject = useSelector(({ state }: { state: any }) => state.topics);
  const topicsArray = topicsObject && Object.values(topicsObject);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<TopicInterface | null>("create");

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<TopicInterface | null>(
    null
  );

  const sortedTopics = topicsArray.sort(
    ({ a, b }: { a: any; b: any }) =>
      new Date(b?.created_at) - new Date(a?.created_at)
  );

  useEffect(() => {
    dispatch(checkUserVote());
  }, []);

  useEffect(() => {
    dispatch(fetchTopics()).catch(console.error);
  }, [dispatch]);

  const handleLoginRedirect = () => {
    history.push("/login"); // Redirect to login page
  };

  const handleCreateTopic = async (topicData: any) => {
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

  const handleEditTopic = async (topicId: number, topicData: any) => {
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
    }
  };

  const handleDeleteClick = (topic: TopicInterface) => {
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

  const handleDeleteTopic = async (topicId: number) => {
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

  const handleEditClick = (topic: Topic) => {
    openModal("edit", topic);
  };

  const handleVote = (topicId: number) => {
    if (!user) {
      alert("You must be logged in to vote");
      return;
    }
    dispatch(castVote(topicId));
  };

  const handleUnvote = (topicId: number) => {
    dispatch(removeVote(topicId));
  };

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

  const openModal = (mode: any, topic = null) => {
    setModalMode(mode);
    setEditingTopic(topic);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTopic(null); // Reset editing topic
  };

  return (
    <>
      <div>
        <div className="topic-list-container">
          <h1 className="woow">Topics</h1>
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

        <div className="toptop">
          <ul className="toptoptop">
            {sortedTopics.length > 0 &&
              sortedTopics.map(
                (topic: TopicInterface) =>
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
