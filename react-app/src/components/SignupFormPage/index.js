// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { signUp } from "../../store/session";
// import "./SignupForm.css";

// function SignupFormModal() {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const { closeModal } = useModal();

//   function isEmail(val) {
//     let regEmail =
//       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!regEmail.test(val)) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   const handleSubmit = async (e) => {
// 	e.preventDefault(); // Prevent the default form submission
	
// 	if (!isEmail(email)) {
// 	  setErrors(["Please enter a valid email address."]);
// 	  return; // Stop the form submission if the email is invalid
// 	}
  
// 	if (password !== confirmPassword) {
// 	  setErrors(["Confirm Password field must be the same as the Password field"]);
// 	  return; // Stop the form submission if the passwords do not match
// 	}
  
// 	// If all validations pass, proceed to dispatch the signup action
// 	const data = await dispatch(signUp(username, email, password));
// 	if (data && data.errors) {
// 	  setErrors(data.errors);
// 	} else {
// 	  closeModal(); // Close the modal only if there are no errors
// 	}
//   };

//   return (
//     <>
//       <div className="modal-backdrop">
//         <div className="modal-content">
//           <div className="modal-header">Sign Up</div>
//           <form onSubmit={handleSubmit} className="modal-form">
//             <button className="close-modal-button" onClick={closeModal}>
//               &times;
//             </button>
//             <ul>
//               {errors.map((error, idx) => (
//                 <li key={idx}>{error}</li>
//               ))}
//             </ul>
//             <label>
//               Email
//               <input
//                 type="text"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </label>
//             <label>
//               Username
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </label>
//             <label>
//               Password
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </label>
//             <label>
//               Confirm Password
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </label>
//             <button type="submit">Sign Up</button>
//           </form>
//           <div className="modal-link">
//             <a href="/login">Already have an account? Log in!</a>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SignupFormModal;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { Link } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  function isEmail(val) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      // Assuming the server responds with a status code of 400 or similar on error
      setErrors(data.errors || ["An unexpected error occurred."]);
    } else {
      closeModal();
      history.push("/");
    }

    // if (!isEmail(email)) {
    //   setErrors(["Please enter a valid email address."]);
    //   return; // Stop the form submission if the email is invalid
    // }

    // if (password !== confirmPassword) {
    //   setErrors(["Confirm Password field must be the same as the Password field"]);
    //   return; // Stop the form submission if the passwords do not match
    // }

    // // If all validations pass, proceed to dispatch the signup action
    // const data = await dispatch(signUp(username, email, password));
    // if (data && data.errors) {
    //   setErrors(data.errors);
    // } else {
    //   closeModal(); // Close the modal only if there are no errors
    //   history.push('/'); // Redirect to home page
    // }
  };

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">Sign Up</div>
          <form onSubmit={handleSubmit} className="modal-form">
            <Link to="/" className="close-modal-button">
              Back to Home Page
            </Link>
            {errors.length > 0 && (
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx} className="error-message">
                    {error}
                  </li>
                ))}
              </ul>
            )}
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Sign Up</button>
          </form>
          <div className="modal-link">
            <a href="/login">Already have an account? Log in!</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormModal;
