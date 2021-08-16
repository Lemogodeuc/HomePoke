import { mapKeys, camelCase } from "lodash";
import { Request, Response, NextFunction } from "express";

const scraperController = {
  async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const scraper = await req.context.dataSources.scrapers.getOneById(req.params.scraperId);

      if (!scraper) {
        return next({ httpStatus: 404 });
      }

      const result = mapKeys(scraper, (_, key) => camelCase(key));
      result.imageUrls = result.imageUrls.split(";");
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async createOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, url, provider, frequency } = req.body;

      const providerId = provider === "leboncoin.fr" ? 1 : null;

      const scraperRequest = {
        title: title,
        active: false,
        status: "inactive",
        pollInterval: frequency,
        url: url,
        method: providerId ? "OPTIONS" : "GET",
        userId: 1,
        providerId: providerId,
      };

      const result = await req.context.dataSources.scrapers.insertOne(scraperRequest);

      if (!result || !result.id) {
        return next({ httpStatus: 404 });
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async updateOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await req.context.dataSources.scrapers.updateOne(req.body);

      if (!result) {
        return next({ httpStatus: 400 });
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async toggleOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { scraperId } = req.params;
      const { active } = req.query;
      const result = await req.context.dataSources.scrapers.toggleOne(scraperId, active === "true");

      if (!result) {
        return next({ httpStatus: 400 });
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { scraperId } = req.params;
      const result = await req.context.dataSources.scrapers.deleteOne(scraperId);

      if (!result) {
        return next({ httpStatus: 400 });
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getAllByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const scrapers = await req.context.dataSources.scrapers.getAllByUserId(req.params.userId);
      if (!scrapers) {
        throw req.context.error.http(404);
      }

      console.log("[scrapers] ", scrapers);

      res.json(scrapers);
    } catch (error) {
      next(error);
    }
  },
};

export default scraperController;
