import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp, authenticate } from "../../store/session";
import { Link } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const sessionMember = useSelector((state) => state.session.member);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { closeModal } = useModal();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const disabled =
    !username ||
    !email ||
    !password ||
    !confirmPassword;

  if (sessionMember) return <Redirect to="/" />;

const handleSubmit = async (e) => {
  e.preventDefault();

  let errorList = {};

  if (!username || username.length < 3)
    errorList.username = "Username must be at least 3 characters long";
  if (!email || !email.includes("@") || !email.includes("."))
    errorList.email = "Valid email is required";
  if (!password || password.length < 6)
    errorList.password = "Password must be at least 6 characters long";
  if (!confirmPassword)
    errorList.confirmPassword = "Please confirm your password";
  if (password !== confirmPassword)
    errorList.confirmPassword = "Passwords must match";

  if (Object.values(errorList).length > 0) {
    setErrors(errorList);
    return;
  }

  // Validation passed, clear any previous errors
  setErrors({});

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
    // Sign in the user immediately after successful signup
    dispatch(authenticate());
    history.push("/");
  }
};

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">Sign Up</div>
          <form onSubmit={handleSubmit} className="modal-form">
            <Link to="/" className="close-modal-button">
              ⬅️ Back to Home Page
            </Link>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p style={{ fontSize: "10px", color: "red" }}>
                *{errors.username}
              </p>
            )}
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors.email && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.email}</p>
            )}
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errors.password && (
              <p style={{ fontSize: "10px", color: "red" }}>
                *{errors.password}
              </p>
            )}

            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {errors.confirmPassword && (
              <p style={{ fontSize: "10px", color: "red" }}>
                *{errors.confirmPassword}
              </p>
            )}
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
