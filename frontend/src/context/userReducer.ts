import jwt from "jsonwebtoken";
import { User, Types } from "../model/User.model";
import { ReducerActions } from "../model";
import { storeState } from "./helpers";

export const userReducer = (state: {} | User, action: ReducerActions) => {
  switch (action.type) {
    case Types.login:
      const token = action.payload;
      const decoded: any = jwt.verify(token, process.env.REACT_APP_JWT_SECRET as string);
      const user: User = decoded.user;
      user.isLoggedIn = true;
      storeState("token", token);
      return storeState("user", user);

    case Types.register:
      return storeState("user", action.payload);

    case Types.update:
      return storeState("user", action.payload);

    default:
      return state;
  }
};
