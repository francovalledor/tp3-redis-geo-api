import { capitalize, entries } from "lodash";
import redisClient from "../redisClient";
import {
  GeoSearchFrom,
  GeoSearchBy,
  GeoReplyWith,
} from "@redis/client/dist/lib/commands/generic-transformers";
import { preloadedPlaces } from "./data";
import { Place } from "./types";


const PREFIX = "geo";

const REDIS_KEYS = {
  POIList: `${PREFIX}:list`,
  POI: (poiName: string) => `${PREFIX}:POI:${poiName}`,
  POIItems: (poiName: string) => `${PREFIX}:POI_ITEMS:${poiName}`,
};

const preloadPlaces = async () => {
  const preloadDoneKey = `${PREFIX}::data-pre-loaded`;

  const isAlreadyPreloaded = await redisClient.get(preloadDoneKey);

  if (isAlreadyPreloaded) return;

  for (const [poi, places] of entries(preloadedPlaces)) {
    await addPlaces(places, poi); 
  }

  await redisClient.set(preloadDoneKey, 1);

  console.log("Data preloaded successfully ✅")
};

const addPOI = async (poiName: string) => {
  await redisClient.sAdd(REDIS_KEYS.POIList, [capitalize(poiName)]);
};

const listPOIs = async () => {
  return redisClient.sMembers(REDIS_KEYS.POIList);
};

const addPlaces = async (places: Place[], poi: string) => {
  const poiName = capitalize(poi);

  await addPOI(poiName);
  const poiKey = REDIS_KEYS.POI(poiName);

  const mappedPlaces = places.map((place) => {
    const { latitude, longitude, name: member } = place;

    return { latitude, longitude, member };
  });

  await redisClient.geoAdd(poiKey, mappedPlaces);
};

const nearby = async (
  poi: string,
  latitude: number,
  longitude: number,
  radius: number
) => {
  const poiKey = REDIS_KEYS.POI(capitalize(poi));

  const from: GeoSearchFrom = {
    latitude,
    longitude,
  };

  const by: GeoSearchBy = {
    radius,
    unit: "km",
  };

  const replyWith = ["WITHDIST", "WITHCOORD"] as GeoReplyWith[];

  await redisClient.geoSearchWith(poiKey, from, by, replyWith);

  const result = await redisClient.geoSearchWith(
    poiKey, {latitude, longitude}, {radius, unit: "km"}, replyWith
  );

  return result.map(each => {
    const {member: name, ...rest} = each;

    return {name, ...rest};
  });
};

const getAllPlaces = async (poi: string) => {
  const poiKey = REDIS_KEYS.POI(capitalize(poi));

  const replyWith = ["WITHCOORD"] as GeoReplyWith[];

  const result = await redisClient.geoSearchWith(
    poiKey, {latitude: 0, longitude: 0}, {radius: 1000000, unit: "km"}, replyWith
  );

  return result.map(each => {
    const {member: name, ...rest} = each;
    
    return {name, ...rest}
  });
};

export default { addPOI, listPOIs, addPlaces, nearby, getAllPlaces, preloadPlaces };