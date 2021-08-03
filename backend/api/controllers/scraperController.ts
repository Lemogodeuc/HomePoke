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

  async getAllByProfileId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {      
      const scrapers = await req.context.dataSources.scrapers.getAllByProfileId(req.params.profileId);
      if (!scrapers) {
        throw req.context.error.http(404);
      }

      res.json(scrapers);
    } catch (error) {
      next(error);
    }
  },
};

export default scraperController;
