// const mailgunS = require('mailgun-js')({ apiKey: api_key, domain: domain, testMode: true })
// import { MailgunData } from "@models/index";
import { Offer } from "../../types";
import { logger } from "../../utils";

export default class Mail {
  private mailgun: any;

  constructor(config: any) {
    this.mailgun = config.mailgun;
  }

  send(offer: Offer): void {
    const { title, price } = offer;
    logger.info(`Preparing emailing for ${title}, ${price}`);
    // this.mailgun.messages().send(data, function (error: any, body: any) {
    //   console.log("body", body);
    // });
  }
}
