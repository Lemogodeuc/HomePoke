import axios from "axios";

class API {
  private baseURL: string;
  private api: any;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.api = axios.create({ baseURL });
  }

  protected async request(method: string, url: string, data?: any) {
    try {
      const result = await this.api[method](url, data);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
}

export default API;
