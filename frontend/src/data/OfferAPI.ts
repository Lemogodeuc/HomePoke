import API from "./API";

class OfferAPI extends API {
  endpoint: string;

  constructor(baseURL: string) {
    super(baseURL);
    this.endpoint = "/offers";
  }

  async getOne(offerId: number) {
    try {
      return await this.request("get", `${this.endpoint}/${offerId}`);
    } catch (error) {
      console.log("[getOne] ", error);
    }
  }

  async getAllByUserId(userId: number) {
    try {
      return await this.request("get", `${this.endpoint}/user/${userId}`);
    } catch (error) {
      console.log("[getAllByUserId] ", error);
    }
  }

  async updateOne(offerId: number, action: string, value: boolean) {
    try {
      return await this.request("patch", `${this.endpoint}/${offerId}/${action}`, { value });
    } catch (error) {
      console.log("[updateOne] ", error);
    }
  }
}

export default OfferAPI;
