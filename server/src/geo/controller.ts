import { Request, RequestHandler } from "express";
import service, {  } from "./service";
import { capitalize, isInteger, isString, isUndefined } from "lodash";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

const addPointOfInterest:RequestHandler = async (req, res) => {
  const name = validateMandatoryString('name', req.query);
  await service.addPOI(capitalize(name));

  res.sendStatus(StatusCodes.CREATED)
};

const listPOIs:RequestHandler = async (req, res) => {
  const result = await service.listPOIs();

  res.send(result);
};

export default { addPointOfInterest, listPOIs };

type RequestInputs = Request["query"] | Request["params"] | Request["body"];

const validateMandatoryString = (paramName: string, params: RequestInputs) => {
  const value = params[paramName];

  if (isUndefined(value)) {
    const error = createHttpError.BadRequest(
      `Missing required param "${paramName}"`
    );
    throw error;
  }

  if ( !isString(value))
    throw createHttpError.BadRequest(
      `The param "${paramName}" should be a string. Received: "${value}"`
    );

  return value;
};

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
