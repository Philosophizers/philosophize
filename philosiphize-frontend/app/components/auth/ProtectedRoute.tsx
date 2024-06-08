import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ props }: { props: any }) => {
  const user = useSelector(({ state }: { state: any }) => state.session.user);
  return (
    <Route {...props}>{user ? props.children : <Redirect to="/login" />}</Route>
  );
};

export default ProtectedRoute;
