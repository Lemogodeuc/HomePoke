interface Images {
  thumb_url: string;
  small_url: string;
  nb_images: string;
  urls: Array<string>;
  urls_thumb: Array<string>;
  urls_large: Array<string>;
}

export interface Attributes {
  key: string;
  value: string;
  values: Array<number>;
  key_label?: string;
  value_label: string;
  generic: boolean;
}

interface Locations {
  country_id: string;
  region_id: string;
  region_name: string;
  department_id: string;
  department_name: string;
  city_label: string;
  city: string;
  zipcode: string;
  lat: number;
  lng: number;
  source: string;
  provider: string;
  is_shape: boolean;
  feature: {
    type: string;
    geometry: {
      type: string;
      coordinates: Array<number>;
    };
    properties: null | any;
  };
}

interface Owner {
  store_id: string;
  user_id: string;
  type: string;
  name: string;
  no_salesmen: boolean;
  activity_sector: string;
}

interface Options {
  has_option: boolean;
  booster: boolean;
  photosup: boolean;
  urgent: boolean;
  gallery: boolean;
  sub_toplist: boolean;
}

export interface Extractor {
  getAttributes: Function;
  handleOffers: Function;
  getPayload: Function;
  getOffers: Function;
}

export interface ParsedContent {
  list_id: number;
  first_publication_date: string;
  expiration_date: string;
  index_date: string;
  status: string;
  category_id: string;
  category_name: string;
  subject: string;
  body: string;
  ad_type: string;
  url: string;
  price: Array<number>;
  price_cents: number;
  price_calendar: null | number;
  images: Images;
  attributes: Array<Attributes>;
  location: Locations;
  owner: Owner;
  options: Options;
  has_phone: boolean;
}

export interface Offer {
  listId?: number;
  active: boolean;
  title: string;
  descripion: string;
  ownerName: string;
  ownerType: string;
  url: string;
  city: string;
  cityCode: number;
  location: string;
  imageUrls: string | Array<string> | null;
  price: number | null;
  includingCharges: boolean | null;
  type: string | null;
  furnished: boolean | null;
  surface: number | null;
  rooms: number | null;
  energy: string | null;
  ges: string | null;
  contacted?: boolean;
  publicationDate: string | null;
  assets: string | null;
}
