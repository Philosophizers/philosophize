import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicOfTheDay, createComment, editComment, removeComment, fetchCommentsForTopic} from "../../store/topics";
const CommentsPage = () => {
  const dispatch = useDispatch();
  const topicOfTheDay = useSelector((state) => state.topics.topicOfTheDay);
  const comments = useSelector((state) => Object.values(state.topics.comments));
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    dispatch(fetchTopicOfTheDay());
  }, [dispatch]);

  useEffect(() => {
    if (topicOfTheDay) {
      dispatch(fetchCommentsForTopic(topicOfTheDay.id));
    }
  }, [dispatch, topicOfTheDay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = [];


    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    };

    const handleEdit = (comment) => {
      setEditCommentId(comment.id);
      setEditedContent(comment.content);
    };

    const handleUpdate = async (commentId) => {
      if (editedContent.trim() === "") {
        // Handle empty content case, e.g., show an error message
        return;
      }
      try {
        await dispatch(editComment(commentId, { content: editedContent }));
        setEditCommentId(null); // Reset edit state
        dispatch(fetchCommentsForTopic(topicOfTheDay.id)); // Refresh comments
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    };
    
    const handleDelete = async (commentId) => {
      try {
        await dispatch(removeComment(commentId));
        dispatch(fetchCommentsForTopic(topicOfTheDay.id)); // Refresh comments
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    };

    const commentData = { content };
    try {
      const res = await dispatch(createComment(topicOfTheDay.id, commentData));
      console.log('res', res)
      
        dispatch(fetchCommentsForTopic(topicOfTheDay.id));
      
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };


//   return (
//     <div>
//       <h1>Comments</h1>
//       {topicOfTheDay ? (
//         <div>
//           <div>
//             {comments.map((comment) => (
//               <div key={comment.id}>
//                 {editCommentId === comment.id ? (
//                   <input
//                     type="text"
//                     value={editedContent}
//                     onChange={(e) => setEditedContent(e.target.value)}
//                   />
//                 ) : (
//                   <p>{comment.content}</p>
//                 )}
//                 {currentUserId === comment.user_id && (
//                   <>
//                     {editCommentId === comment.id ? (
//                       <button onClick={() => handleUpdate(comment.id)}>Save</button>
//                     ) : (
//                       <button onClick={() => handleEdit(comment)}>Edit</button>
//                     )}
//                     <button onClick={() => handleDelete(comment.id)}>Delete</button>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label>New Comment</label>
//               <input
//                 type="text"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//               />
//               {errors.content && <p>{errors.content}</p>}
//             </div>
//             <button type="submit">Create Comment</button>
//           </form>
//         </div>
//       ) : (
//         <p>Loading topic...</p>
//       )}
//     </div>
//   );
// };  
  
  return (
    <div>
      <h1>Comments</h1>
      {topicOfTheDay ? (
        <div>
          <div>
            {comments.map((comment) => (
              <p key={comment.id}>{comment.content}
              </p>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>New Comment</label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && <p>{errors.content}</p>}
            </div>
            <button type="submit">Create Comment</button>
            
          </form>
        </div>
      ) : (
        <p>Loading topic...</p>
      )}
    </div>
  );
};

export default CommentsPage;
