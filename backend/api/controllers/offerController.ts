import { Request, Response, NextFunction } from "express";
import { Offer } from "../../types";

const offerController = {
  async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const offer = await req.context.dataSources.offers.getOneById(req.params.offerId);

      if (!offer) {
        return next({ httpStatus: 404 });
      }

      offer.imageUrls = offer.imageUrls.split(";");
      offer.excerpt = offer.description.split(/\\n/)[0];
      offer.description = offer.description.split(/\\n/).join("");

      res.json(offer);
    } catch (error) {
      next(error);
    }
  },

  async getAllByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const offers = await req.context.dataSources.offers.getAllByUserId(req.params.userId);

      if (!offers) {
        res.status(404).json({ code: 404, data: "Ressource not found" });
        return;
      }
      offers.forEach((offer: Offer) => {
        offer.imageUrls = typeof offer.imageUrls === "string" ? offer.imageUrls.split(";") : offer.imageUrls;
        offer.excerpt = offer.description.split(/\\n/)[0];
        offer.description = offer.description.split(/\\n/).join("");
      });

      res.json(offers);
    } catch (error) {
      next(error);
    }
  },

  async updateOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { offerId, action } = req.params;
      const { value } = req.body;
      const result = await req.context.dataSources.offers.updateOneById(offerId, action, value);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};

export default offerController;
