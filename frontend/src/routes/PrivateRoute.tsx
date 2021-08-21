import { FC, ReactElement, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

// context
import { AppContext } from "../context";

// types
import RouteItem from "../model/RouteItem.model";

interface Props {
  key: string;
  path: string;
  exact: boolean;
  component: any;
  rest: RouteItem;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }): ReactElement => {
  const { state } = useContext(AppContext);
  const isLoggedIn = state.user.isLoggedIn;

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route {...rest} render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />)} />
  );
};

export default PrivateRoute;
