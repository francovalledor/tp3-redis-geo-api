import redisClient from "../redisClient";
import { fromPairs, sortBy } from "lodash";

const PREFIX = "geo";

const REDIS_KEYS = {
  POIList: `${PREFIX}:list`,
  POI: (poiName: string) => `${PREFIX}:POI:${poiName}`,
  POIItems: (poiName: string) => `${PREFIX}:POI_ITEMS:${poiName}`
};

const addPOI = async (poiName: string) => {
  await redisClient.sAdd(REDIS_KEYS.POIList, [poiName])
};

const listPOIs = async () => {
  return redisClient.sMembers(REDIS_KEYS.POIList);
}

export default {addPOI, listPOIs}