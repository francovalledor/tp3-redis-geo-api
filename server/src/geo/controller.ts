import { Request, RequestHandler } from "express";
import service from "./service";
import { isString, isUndefined } from "lodash";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

const addPointOfInterest: RequestHandler = async (req, res) => {
  const name = validateMandatoryString("name", req.body);
  await service.addPOI(name);

  res.sendStatus(StatusCodes.CREATED);
};

const addPlace: RequestHandler = async (req, res) => {
  const poiName = validateMandatoryString("poi", req.params);
  const placeName = validateMandatoryString("name", req.body);
  const latitude = validateMandatoryNumber("latitude", req.body);
  const longitude = validateMandatoryNumber("longitude", req.body);

  await service.addPlaces([{ name: placeName, latitude, longitude }], poiName);

  res.sendStatus(StatusCodes.CREATED);
};

const nearby: RequestHandler = async (req, res) => {
  const poi = validateMandatoryString("poi", req.query);
  const latitude = validateMandatoryNumber("latitude", req.query);
  const longitude = validateMandatoryNumber("longitude", req.query);
  const radius = validateMandatoryNumber("radius", req.query);

  const result = await service.nearby(poi, latitude, longitude, radius);

  res.send(result);
};

const listPlaces: RequestHandler = async (req, res) => {
  const poi = validateMandatoryString("poi", req.params);

  const response = await service.getAllPlaces(poi);

  res.send(response);
};

const listPOIs: RequestHandler = async (req, res) => {
  const result = await service.listPOIs();

  res.send(result);
};

export default { addPointOfInterest, listPOIs, addPlace, nearby, listPlaces };

type RequestInputs = Request["query"] | Request["params"] | Request["body"];

const validateMandatoryString = (paramName: string, params: RequestInputs) => {
  const value = params[paramName];

  if (isUndefined(value)) {
    const error = createHttpError.BadRequest(
      `Missing required param "${paramName}"`
    );
    throw error;
  }

  if (!isString(value))
    throw createHttpError.BadRequest(
      `The param "${paramName}" should be a string. Received: "${value}"`
    );

  return value;
};

const validateMandatoryNumber = (paramName: string, params: RequestInputs) => {
  const value = params[paramName];

  if (isUndefined(value)) {
    const error = createHttpError.BadRequest(
      `Missing required param "${paramName}"`
    );
    throw error;
  }

  const parsedValue = Number(value);

  if (isNaN(parsedValue))
    throw createHttpError.BadRequest(
      `The param "${paramName}" should be a number. Received: "${value}"`
    );

  return parsedValue;
};
