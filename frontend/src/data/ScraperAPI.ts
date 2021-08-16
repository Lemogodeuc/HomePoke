import API from "./API";
import { ScrapFormValues } from "../model/Scrap.model";
class ScraperAPI extends API {
  private endpoint: string;

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

  async createOne(data: ScrapFormValues) {
    try {
      return await this.request("put", `${this.endpoint}/create`, data);
    } catch (error) {
      console.log("[createOne] ", error);
    }
  }

  async updateOne(data: ScrapFormValues) {
    try {
      return await this.request("put", `${this.endpoint}/update`, data);
    } catch (error) {
      console.log("[updateOne] ", error);
    }
  }

  async toggleOne(id: number, value: boolean) {
    try {
      return await this.request("patch", `${this.endpoint}/toogle/${id}?active=${value}`);
    } catch (error) {
      console.log("[createOne] ", error);
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
