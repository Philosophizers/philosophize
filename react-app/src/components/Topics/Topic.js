// import React from 'react';

// function Topic({ topic }) {
//   // Format the date/time if needed
//   const createdAt = new Date(topic.created_at).toLocaleString();
//   const updatedAt = new Date(topic.updated_at).toLocaleString();

//   return (
//     <div className="topic">
//       <h3>{topic.title}</h3>
//       <p>{topic.description}</p>
//       <small>Created at: {createdAt}</small><br />
//       <small>Last updated: {updatedAt}</small>
//       {/* If you want to link to comments or resources, you can add that here */}
//     </div>
//   );
// }

// export default Topic;


// import React from 'react';

// function Topic({ topic, onEdit, onDelete }) {
//   const createdAt = new Date(topic.created_at).toLocaleString();
//   const updatedAt = new Date(topic.updated_at).toLocaleString();

//   return (
//     <div className="topic">
//       <h3>{topic.title}</h3>
//       <p>{topic.description}</p>
//       <small>Created at: {createdAt}</small><br />
//       <small>Last updated: {updatedAt}</small>
//       <button onClick={() => onEdit(topic)}>Edit</button>
//       <button onClick={() => onDelete(topic.id)}>Delete</button>
//     </div>
//   );
// }

// export default Topic;


import React from 'react';

function Topic({ topic, onEdit, onDelete }) {
  if (!topic) {
    // Handle the null or undefined topic case
    console.error('Topic is null or undefined');
    return null; // or some placeholder content
  }

  const createdAt = new Date(topic.created_at).toLocaleString();
  const updatedAt = new Date(topic.updated_at).toLocaleString();

  return (
    <div className="topic">
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>
      <small>Created at: {createdAt}</small><br />
      <small>Last updated: {updatedAt}</small>
      <button onClick={() => onEdit(topic)}>Edit</button>
      <button onClick={() => onDelete(topic.id)}>Delete</button>
    </div>
  );
}

export default Topic;
