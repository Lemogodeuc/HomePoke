import API from "./API";

class ScraperAPI extends API {
  endpoint: string;

  constructor(baseURL: string) {
    super(baseURL);
    this.endpoint = "/scrapers";
  }

  async getOneScrap(scrapId: number) {
    try {
      return await this.request("get", `${this.endpoint}/${scrapId}`);
    } catch (error) {
      console.log("[getOneScrap] ", error);
    }
  }

  async getAllByUserId(userId: number) {
    try {
      return await this.request("get", `${this.endpoint}/user/${userId}`);
    } catch (error) {
      console.log("[getAllByUserId] ", error);
    }
  }

  async createOne(userId: number, data: any) {
    try {
      return await this.request("post", `${this.endpoint}/user/${userId}`, data);
    } catch (error) {
      console.log("[createOne] ", error);
    }
  }
  async updateOne(data: any) {
    try {
      return await this.request("put", this.endpoint, data);
    } catch (error) {
      console.log("[updateOne] ", error);
    }
  }
  async deleteOne(scrapId: number) {
    try {
      return await this.request("delete", `${this.endpoint}/${scrapId}`);
    } catch (error) {
      console.log("[deleteOne] ", error);
    }
  }
}

export default ScraperAPI;
