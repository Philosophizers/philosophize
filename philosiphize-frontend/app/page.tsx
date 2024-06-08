"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal/page";
import Navigation from "./components/Navigation/page";
import SignupFormPage from "./components/SignupFormPage/page";
import { authenticate } from "./store/session";

import AboutPage from "./components/AboutPage/AboutPage";
import CommentsPage from "./components/CommentsPage/page";
import LandingPage from "./components/LandingPage/page";
import CreateTopicForm from "./components/Topics/TopicForm";
import TopicList from "./components/Topics/TopicList";

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
          <Route path="/login">
            <LoginFormModal />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/topics">
            <TopicList />
          </Route>
          <Route path="/topics/new">
            <CreateTopicForm />
          </Route>
          <Route path="/comments">
            <CommentsPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
