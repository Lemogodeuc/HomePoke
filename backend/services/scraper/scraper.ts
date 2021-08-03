import { UrlTarget } from "../../types";
import { logger } from "../../utils";
import { URL } from "url";
import axios from "axios";
import fs from "fs";
import path from "path";

export default class Scraper {
  private urlTargets: Array<UrlTarget>;
  private handleOffers: null | Function;
  private intervalId: any;

  constructor(urlTargets: Array<UrlTarget>) {
    this.urlTargets = urlTargets;
    this.intervalId = null;
    this.handleOffers = null;
  }

  private read(filepath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(path.resolve(__dirname, filepath), (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data.toString());
      });
    });
  }

  private getProvider(url: string): string | null {
    const hostname = new URL(url).hostname;
    const match = hostname.match(/[^www](?<provider>\w+)/);
    if (match && match.groups && match.groups.provider) {
      return match.groups.provider;
    }
    return null;
  }

  private async pollUrl(url: string, headers?: any, intervalId?: any) {
    try {
      const provider = this.getProvider(url);
      // const { data } = await axios(url, headers);
      const data = await this.read(process.cwd() + "/mocks/leboncoin/response.text");
      this.handleOffers && this.handleOffers(undefined, { provider, html: data }, intervalId);
    } catch (e) {
      console.log("error", {
        host: e.request.host,
        message: e.message,
        detail: e.response.statusText,
      });
      logger.error({
        messaqe: e.message,
        stack: e.stack,
      });
      this.handleOffers && this.handleOffers(e, null, intervalId);
    }
  }

  private pollUrls(targets: Array<UrlTarget>): void {
    targets.forEach(async ({ active, pollInterval, fetchOnlyOnce, url, options }: UrlTarget) => {
      if (!active) {
        return;
      }

      if (fetchOnlyOnce) {
        this.pollUrl(url, options);
      } else {
        this.intervalId = setInterval(() => this.pollUrl(url, options, this.intervalId), pollInterval);
      }
    });
  }

  startPolling(callback: Function): void {
    this.handleOffers = callback;
    this.pollUrls(this.urlTargets);
  }
}
