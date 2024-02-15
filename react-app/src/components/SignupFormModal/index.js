
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
// import { useModal } from "../../context/Modal";
// import { signUp, authenticate } from "../../store/session";
// import { Link } from "react-router-dom";
// import "./SignupForm.css";

// function SignupFormModal() {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const sessionMember = useSelector((state) => state.session.member)
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { closeModal } = useModal();
//   const history = useHistory();
//   const [errors, setErrors] = useState([]);
  

//   const disabled =
//     !username||
//     !email ||
//     !password ||
//     !confirmPassword;

//   if (sessionMember) return <Redirect to="/" />;

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
//     e.preventDefault();

//     let errorList = {};

//     const response = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         email,
//         password,
//       }),
//     });

//     const checkUnique = await fetch('/api/auth/validate-unique', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, email }),
//     });
  
//     if (!checkUnique.ok) {
//       const uniqueErrors = await checkUnique.json();
//       setErrors(prev => ({ ...prev, ...uniqueErrors }));
//       return;
//     }


//     const data = await response.json();
//     if (!response.ok) {
//       // Assuming the server responds with a status code of 400 or similar on error
//       setErrors(data.errors || ["An unexpected error occurred."]);
//     } else {
//       closeModal();
//       history.push("/");
//     }

//     if (!username) errorList.username = "Username is required";
//     if (!email || !email.includes("@"))
//       errorList.email = "Valid email is required";
//     if (!password || password.length<6) errorList.password = "Password must be at least 6 characters";
//     if (!confirmPassword) errorList.confirmPassword = "Confirm Password is required";
//     if (!isEmail(email)) errorList.email = "Valid email is required";
//     if (password.length < 6) errorList.password = "Password must be at least 6 characters";
//     if (password !== confirmPassword)
//       errorList.confirmPassword = "Passwords must match";
//     if (!checkUnique.username.ok) errorList.username = "Username is already taken";

//     if (Object.values(errorList).length > 0) {
//       setErrors(errorList);
//       return;
//     }

//     if (password === confirmPassword) {
//       setErrors({});
//       const response = await dispatch(
//         signUp({
//           username,
//           email,
//           password,
//         })
//       ).catch((res) => res);
//       if (response && response[0].startsWith("email")) {
//         const errorList_email = { "email": response[0].slice(8) };
//         setErrors(errorList_email);
//       } else {
//         dispatch(authenticate());
//         history.push('/')
//       }
//     } else {
//     return setErrors({
//       confirmPassword:
//         "Confirm Password field must be the same as the Password field",
//     });
//   }
//   };

//   return (
//     <>
//       <div className="modal-backdrop">
//         <div className="modal-content">
//           <div className="modal-header">Sign Up</div>
//           <form onSubmit={handleSubmit} className="modal-form">
//             <Link to="/" className="close-modal-button">
//               Back to Home Page
//             </Link>
//             <label>
//             1Username
//             </label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             {errors.username && (
//               <p style={{ fontSize: "10px", color: "red" }}>
//                 *{errors.username}
//               </p>
//             )}
//             <label>
//             Email
//             </label>
//             <input
//               type="text"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//             />
//             {errors.email && (
//               <p style={{ fontSize: "10px", color: "red" }}>*{errors.email}</p>
//             )}
//             <label>
//             Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//             />
//             {errors.password && (
//               <p style={{ fontSize: "10px", color: "red" }}>
//                 *{errors.password}
//               </p>
//             )}

//           <label>
//             Confirm Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => {
//                 setConfirmPassword(e.target.value);
//               }}
//             />
//             {errors.confirmPassword && (
//               <p style={{ fontSize: "10px", color: "red" }}>
//                 *{errors.confirmPassword}
//               </p>
//             )}
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
