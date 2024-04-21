import redisClient from "../redisClient";
import { fromPairs, sortBy } from "lodash";
import { Episode, episodesData } from "./episodesData";

const getEpisodeIdentifier = (season: number, episode: number) =>
  `${season}:${episode}`;

const PREFIX = "mandalorian";

const REDIS_KEYS = {
  episodeStatus: (season: number, episode: number) =>
    `${PREFIX}:statuses:${getEpisodeIdentifier(season, episode)}`,
};

export enum EPISODE_STATUS {
  RESERVED = "RESERVED",
  RENTED = "RENTED",
  AVAILABLE = "AVAILABLE",
}

const getEpisodeStatus = async (
  season: number,
  episode: number
): Promise<EPISODE_STATUS> => {
  const response = await redisClient.get(
    REDIS_KEYS.episodeStatus(season, episode)
  );

  return (response ?? EPISODE_STATUS.AVAILABLE) as EPISODE_STATUS;
};

const getAllStatuses = async () => {
  const allTheKeys = episodesData.map(({ episode, season }) =>
    REDIS_KEYS.episodeStatus(season, episode)
  );

  const response = (await redisClient.mGet(allTheKeys)).map(
    (status) => status ?? EPISODE_STATUS.AVAILABLE
  );

  const dictionary = fromPairs(
    episodesData.map(({ episode, season }, index) => [
      getEpisodeIdentifier(season, episode),
      response[index],
    ])
  );

  return dictionary;
};

const isAvailable = async (season: number, episode: number) => {
  const status = await getEpisodeStatus(season, episode);

  return status === EPISODE_STATUS.AVAILABLE;
};

const reserve = async (season: number, episode: number) => {
  const RESERVATION_TTL = 60 * 4;

  await redisClient.set(
    REDIS_KEYS.episodeStatus(season, episode),
    EPISODE_STATUS.RESERVED,
    { EX: RESERVATION_TTL }
  );
};

const confirmRent = async (season: number, episode: number) => {
  const RENT_TTL = 60 * 60 * 24;

  await redisClient.set(
    REDIS_KEYS.episodeStatus(season, episode),
    EPISODE_STATUS.RENTED,
    { EX: RENT_TTL }
  );
};

const list = async () => {
  const statuses = await getAllStatuses();

  const enrichSeasonWithStatuses = (episode: Episode) => ({
    ...episode,
    status: statuses[getEpisodeIdentifier(episode.season, episode.episode)],
  });

  return episodesData.map(enrichSeasonWithStatuses);
};

const getSeasonEpisodes = (seasonNumber: number): Episode[] => {
  const seasonEpisodes = episodesData.filter(
    (episode) => episode.season === seasonNumber
  );

  return sortBy(seasonEpisodes, (ep) => ep.episode);
};

const getEpisode = (seasonNumber: number, episodeNumber: number) =>
  episodesData.find(
    (ep) => ep.episode === episodeNumber && ep.season == seasonNumber
  );

const seasonExists = (season: number) => !!getSeasonEpisodes(season).length;

const episodeExists = (seasonNumber: number, episodeNumber: number) => {
  return getEpisode(seasonNumber, episodeNumber);
};

export default {
  isAvailable,
  reserve,
  confirmRent,
  list,
  seasonExists,
  episodeExists,
  getEpisodeStatus,
  getEpisode,
};
