import API from "./API";
import { UserLogin, UserRegister, User, Types } from "../model/User.model";

class UserAPI extends API {
  private endpoint: string;

  constructor(baseURL: string) {
    super(baseURL);
    this.endpoint = "/users";
  }

  async login(credentials: UserLogin) {
    try {
      return await this.request("post", `${this.endpoint}/login`, credentials);
    } catch (error) {
      console.log("[login] ", error);
    }
  }

  async createOne(userData: UserRegister) {
    try {
      console.log("[userData] ", userData);
      return await this.request("put", `${this.endpoint}/create`, userData);
    } catch (error) {
      console.log("[createOne] ", error);
    }
  }

  async getOne(userId: number) {
    try {
      return await this.request("get", `${this.endpoint}/${userId}`);
    } catch (error) {
      console.log("[getOne] ", error);
    }
  }

  async updateOne(user: User) {
    try {
      return await this.request("patch", `${this.endpoint}/${user.id}`, user);
    } catch (error) {
      console.log("[updateOne] ", error);
    }
  }
}

export default UserAPI;
