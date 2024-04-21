import redisClient from "../redisClient";
import { fromPairs, sortBy } from "lodash";

const PREFIX = "geo";

const REDIS_KEYS = {
  POIList: `${PREFIX}:list`,
  POI: (poiName: string) => `${PREFIX}:POI:${poiName}`,
  POIItems: (poiName: string) => `${PREFIX}:POI_ITEMS:${poiName}`,
};

const addPOI = async (poiName: string) => {
  await redisClient.sAdd(REDIS_KEYS.POIList, [poiName]);
};

const listPOIs = async () => {
  return redisClient.sMembers(REDIS_KEYS.POIList);
};

const addPlaces = async (places: Place[], poi: string) => {
  await addPOI(poi);
  const poiKey = REDIS_KEYS.POI(poi);

  const mappedPlaces = places.map((place) => {
    const { latitude, longitude, name: member } = place;

    return { latitude, longitude, member };
  });

  await redisClient.geoAdd(poiKey, mappedPlaces);
};

export default { addPOI, listPOIs, addPlaces };

export type Place = { latitude: number; longitude: number; name: string };
