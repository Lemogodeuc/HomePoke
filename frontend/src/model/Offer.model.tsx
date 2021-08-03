export interface Offer {
  id: number | string;
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
  publicationDate: string | null;
  contacted: boolean;
  profileId: string | null;
  assets: string | null;
}
