import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	function isEmail(val) {
		let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!regEmail.test(val)){
		  return false;
		} else {
		  return true
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isEmail(email)) {
			if (password === confirmPassword) {
				const data = await dispatch(signUp(username, email, password));
				if (data) {
					setErrors(data);
				} else {
					closeModal();
				}
			} else {
				setErrors([
					"Confirm Password field must be the same as the Password field",
				]);
			}
		} else {
			setErrors([
				"email is invalid",
			]);
		}
	};

	return (
		<>
		 <div className="modal-backdrop">
  <div className="modal-content">
    <div className="modal-header">Sign Up</div>
    <form onSubmit={handleSubmit} className="modal-form">
	<button className="close-modal-button" onClick={closeModal}>&times;</button>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
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
