import { mapKeys, camelCase } from "lodash";
import { Request, Response, NextFunction } from "express";

const offerController = {
  async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const offer = await req.context.dataSources.offers.getOneById(req.params.offerId);
  
      if (!offer) {
        return next({ httpStatus: 404 });
      }
  
      const result = mapKeys(offer, (_, key) => camelCase(key));
      result.imageUrls = result.imageUrls.split(";");
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getAllByProfileId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const offers = await req.context.dataSources.offers.getAllByProfileId(req.params.profileId);
  
      if (!offers || !offers.length) {
        res.status(404).json({ code: 404, data: "Ressource not found" });
      }
  
      const results = offers.map((offer: any) => {
        const result = mapKeys(offer, (_, key) => camelCase(key));
        result.imageUrls = result.imageUrls.split(";");
        return result;
      });
  
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

export default offerController;
