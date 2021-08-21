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
  isRestricted: boolean;
  rest: RouteItem;
}

const PublicRoute: FC<Props> = ({ component: Component, isRestricted, ...rest }): ReactElement => {
  const { state } = useContext(AppContext);
  const isLoggedIn = state.user.isLoggedIn;

  return (
    // If restricted, don't show component
    // Ex: Authenticated user will never see login page
    <Route
      {...rest}
      render={(props) => (isLoggedIn && isRestricted ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

export default PublicRoute;
