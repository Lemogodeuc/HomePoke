import { ParsedContent, Attributes, Offer } from "../../../types";

const leboncoin = {
  setAttributes(cleanOffer: Offer, attributes: Array<Attributes>): Offer {
    attributes.forEach(({ key, value, value_label }) => {
      switch (key) {
        case "charges_included":
          cleanOffer.includingCharges = +value === 1;
          break;
        case "real_estate_type":
          cleanOffer.type = value_label;
          break;
        case "furnished":
          cleanOffer.furnished = +value !== 2;
          break;
        case "square":
          cleanOffer.surface = +value;
          break;
        case "rooms":
          cleanOffer.rooms = +value;
          break;
        case "energy_rate":
          cleanOffer.energy = value_label === "Non renseigné" ? null : value_label;
          break;
        case "ges":
          cleanOffer.ges = value_label === "Non renseigné" ? null : value_label;
          break;
        case "realestate_assets":
          cleanOffer.assets = value_label;
          break;
        default:
          break;
      }
    });

    return cleanOffer;
  },

  handleOffers(offers: Array<ParsedContent>): Array<Offer> {
    const cleaned = offers.map((offer: ParsedContent) => {
      const cleanOffer: Offer = {
        listId: offer.list_id,
        active: offer.status === "active",
        title: offer.subject,
        descripion: JSON.stringify(offer.body),
        ownerName: offer.owner.name,
        ownerType: offer.owner.type,
        url: offer.url,
        city: offer.location.city,
        cityCode: +offer.location.zipcode,
        location: `https://wego.here.com/?map=${offer.location.lat},${offer.location.lng},normal&x=ep`,
        imageUrls: offer.images.urls.join(";"),
        price: +offer.price_cents / 100,
        includingCharges: null,
        type: null,
        furnished: null,
        surface: null,
        rooms: null,
        energy: null,
        ges: null,
        assets: null,
        publicationDate: offer.first_publication_date && new Date(offer.first_publication_date).toISOString(),
      };

      return leboncoin.setAttributes(cleanOffer, offer.attributes);
    });

    return cleaned;
  },

  getPayload(rawString: string): Array<ParsedContent> {
    const pattern = /(?="ads":).*(?<=,"applied_condition)/gm;
    const target = rawString ? rawString.match(pattern) : [];
    const cleaned = target && target[0].replace('"ads":', "").replace(',"applied_condition', "");
    return cleaned ? JSON.parse(cleaned) : "";
  },

  getOffers(rawString: string): Array<Offer> {
    const rawOffers = leboncoin.getPayload(rawString);
    return leboncoin.handleOffers(rawOffers);
  },
};

export default leboncoin;
