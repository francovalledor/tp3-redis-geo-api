import { Place } from "./types";

const HOST = `http://localhost:3000`;

const BASE_URL = `${HOST}/geo/`;

const fetchJson = async <T>(...params: Parameters<typeof fetch>): Promise<T> =>
  fetch(...params).then((res) => res.json());

export const getAllPois = () => fetchJson<string[]>(`${BASE_URL}/pois`);

export type SearchReturnType = {
  name: string;
  distance: string;
  coordinates: { latitude: string; longitude: string };
}[];

export const search = async (
  poi: string,
  latitude: number,
  longitude: number,
  radius: number
) => {
  const url = new URL(`${BASE_URL}/search`);

  Object.entries({ poi, latitude, longitude, radius }).forEach(
    ([key, value]) => url.searchParams.append(key, String(value))
  );

  return fetchJson<SearchReturnType>(url.toString());
};

export const addPoi = (name: string) =>
  fetch(`${BASE_URL}/pois`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

export const addPlace = (poiName: string, place: Place) =>
  fetch(`${BASE_URL}/pois/${poiName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(place),
  });

export const listPlaces = (poiName: string) =>
  fetchJson<SearchReturnType>(`${BASE_URL}/pois/${poiName}`);
