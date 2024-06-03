// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	try {
		const response = await fetch("/api/auth/", {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const data = await response.json();
			if (data.errors) {
				return;
			}
			dispatch(setUser(data));
		} else {
			const errorData = await response.json();
			console.error("Authenticate Error:", errorData);
		}
	} catch (error) {
		console.error("Network Error:", error);
	}
};

export const login = (email, password) => async (dispatch) => {
	try {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
			credentials: 'include', // Include cookies with the request
		});
		if (response.ok) {
			const data = await response.json();
			dispatch(setUser(data));
			return null;
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	} catch (error) {
		console.error("Network Error:", error);
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	try {
		const response = await fetch("/api/auth/logout", {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			dispatch(removeUser());
		} else {
			const errorData = await response.json();
			console.error("Logout Error:", errorData);
		}
	} catch (error) {
		console.error("Network Error:", error);
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	try {
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
		if (response.ok) {
			const data = await response.json();
			dispatch(setUser(data));
			return null;
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	} catch (error) {
		console.error("Network Error:", error);
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
