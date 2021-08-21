import { UserLogin } from "../../model/User.model";

const init = (type: "login" | "register"): UserLogin => {
  const values: UserLogin = {
    email: "",
    password: "",
  };

  return type === "login"
    ? values
    : Object.assign(values, {
        firstname: "",
        lastname: "",
        passwordRepeat: "",
      });
};

export default init;
