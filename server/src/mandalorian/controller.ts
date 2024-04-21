import { RequestHandler, Request } from "express";
import { StatusCodes } from "http-status-codes";
import service, { EPISODE_STATUS } from "./service";
import { isInteger, isUndefined } from "lodash";
import createHttpError from "http-errors";

const getDetails: RequestHandler = async (req, res) => {
  const response = await service.list();

  res.send(response);
};

const getEpisodeDetails: RequestHandler = async (req, res) => {
  const season = validateMandatoryInteger("season", req.query);
  const episode = validateMandatoryInteger("episode", req.query);

  validateEpisodeExists(season, episode);

  const episodeData = service.getEpisode(season, episode);
  const status = await service.getEpisodeStatus(season, episode);

  res.send({ ...episodeData, status });
};

const reserve: RequestHandler = async (req, res) => {
  const season = validateMandatoryInteger("season", req.query);
  const episode = validateMandatoryInteger("episode", req.query);

  validateEpisodeExists(season, episode);

  const episodeStatus = await service.getEpisodeStatus(season, episode);

  if (episodeStatus === EPISODE_STATUS.RENTED) {
    throw new createHttpError.Conflict(
      `The episode is already rented (season ${season} episode ${episode})`
    );
  }

  if (episodeStatus === EPISODE_STATUS.RESERVED) {
    throw new createHttpError.Conflict(
      `The episode is already reserved (season ${season} episode ${episode})`
    );
  }

  await service.reserve(Number(season), Number(episode));

  res.sendStatus(StatusCodes.OK);
};

const pay: RequestHandler = async (req, res) => {
  const season = validateMandatoryInteger("season", req.query);
  const episode = validateMandatoryInteger("episode", req.query);

  validateEpisodeExists(season, episode);

  const episodeStatus = await service.getEpisodeStatus(season, episode);

  if (episodeStatus === EPISODE_STATUS.AVAILABLE) {
    throw new createHttpError.Conflict(
      `The episode should be reserved first (season ${season} episode ${episode})`
    );
  }

  if (episodeStatus === EPISODE_STATUS.RENTED) {
    throw new createHttpError.Conflict(
      `The episode is already rented (season ${season} episode ${episode})`
    );
  }

  await service.confirmRent(Number(season), Number(episode));

  return res.sendStatus(StatusCodes.OK);
};

export default { getDetails, reserve, pay, getEpisodeDetails };

type RequestInputs = Request["query"] | Request["params"] | Request["body"];

const validateMandatoryInteger = (paramName: string, params: RequestInputs) => {
  const value = params[paramName];

  if (isUndefined(value)) {
    const error = createHttpError.BadRequest(
      `Missing required param "${paramName}"`
    );
    throw error;
  }

  const parsedValue = Number(value);

  if (isNaN(parsedValue) || !isInteger(parsedValue))
    throw createHttpError.BadRequest(
      `The param "${paramName}" should be an integer. Received: "${value}"`
    );

  return parsedValue;
};

const validateEpisodeExists = (seasonNumber: number, episodeNumber: number) => {
  if (!service.seasonExists(seasonNumber))
    throw new createHttpError.BadRequest(
      `The season ${seasonNumber} does not exist`
    );

  if (!service.episodeExists(seasonNumber, episodeNumber))
    throw new createHttpError.BadRequest(
      `The episode does not exist. (season ${seasonNumber} episode ${episodeNumber})`
    );
};
