import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

import LandingPage from "./components/LandingPage/LandingPage";
import CreateTopicForm from './components/Topics/TopicForm'
import TopicList from './components/Topics/TopicList' 
import CommentsPage from "./components/CommentsPage/CommentsPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/topics">
            <TopicList/>
          </Route>
          <Route path="/topics/new">
            <CreateTopicForm />
          </Route>
          <Route path="/comments">
            <CommentsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
