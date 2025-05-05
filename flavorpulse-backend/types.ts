export type Review = {
  id: string;
  text: string;
  date: string;
  author?: string;
  rating?: number;
  platform: string;       // ✅ changed from `source`
  location?: string;
  url: string;             // ✅ added since it's used in your scraper
};

export type ScraperOptions = {
  restaurantName: string;  // ✅ renamed from `restaurant`
  location: string;
  limit?: number;
};
