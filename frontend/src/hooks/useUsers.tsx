import { useContext } from "react";
import { AppContext } from "../context";

// types
import { UserLogin, UserRegister, User, Types } from "../model/User.model";

// API
import API from "../data";

const useUsers = () => {
  const { dispatch } = useContext(AppContext);

  const loginUser = async (userPaylod: UserLogin) => {
    try {
      const token: string = await API.user.login(userPaylod);
      dispatch({ type: Types.login, payload: token });
    } catch (error) {
      console.log("[loginUser] ", error);
    }
  };

  const registerUser = async (userPayload: UserRegister) => {
    try {
      const token: string = await API.user.createOne(userPayload);
      dispatch({ type: Types.register, payload: token });
    } catch (error) {
      console.log("[registerUser] ", error);
    }
  };

  const getUser = async (userId: number = 1) => {
    try {
      const user: User = await API.user.getOne(userId);
      dispatch({ type: Types.getOne, payload: user });
    } catch (error) {
      console.log("[getUser] ", error);
    }
  };

  const updateUser = async (data: User) => {
    try {
      await API.user.updateOne(data);
      dispatch({ type: Types.update, payload: data });
    } catch (error) {
      console.log("[updateUser] ", error);
    }
  };

  return { loginUser, registerUser, getUser, updateUser };
};

export default useUsers;
