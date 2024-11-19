export interface Store {
  store_name: string;
  road_address: string;
  jibun_address: string;
  lon: number;
  lat: number;
  contact_number: string;
  operating_hours: string;
  district: string;
  created_at: string;
  updated_at: string;
  store_id: string;
}

export type SortType = "distance" | "popularity" | null;

export interface StoreWithExtra extends Store {
  distance?: number;
  bookmarkCount?: number;
}

export interface BookmarkCount {
  store_id: string;
  count: number;
}