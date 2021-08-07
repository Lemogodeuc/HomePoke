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

  async getAllByProfileId(profileId: number) {
    try {
      return await this.request("get", `${this.endpoint}/profile/${profileId}`);
    } catch (error) {
      console.log("[getAllByProfileId] ", error);
    }
  }

  async createOne(profileId: number, data: any) {
    try {
      return await this.request("post", `${this.endpoint}/profile/${profileId}`, data);
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
