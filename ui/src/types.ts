export type Episode = {
  name: string;
  season: number;
  episode: number;
  cast: CastItem[];
  status: EPISODE_STATUS;
};

export type CastItem = { actor: string; characters: string[] };

export enum EPISODE_STATUS {
  RESERVED = "RESERVED",
  RENTED = "RENTED",
  AVAILABLE = "AVAILABLE",
}