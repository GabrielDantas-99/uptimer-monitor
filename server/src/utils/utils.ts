import { Request } from "express";
import { GraphQLError } from "graphql";
import { IAuthPayload } from "@app/interfaces/user.interface";
import { verify } from "jsonwebtoken";
import { JWT_TOKEN } from "@app/server/config";
import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import {
  getAllUsersActiveMonitors,
  getMonitorById,
  startCreatedMonitors,
} from "@app/services/monitor.service";
import { toLower } from "lodash";

export const appTimeZone: string =
  Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Email validator
 * @returns {boolean}
 */
export const isEmail = (email: string): boolean => {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return regexExp.test(email);
};

/**
 * Authenticates user access to protected routes
 * @param req
 * @returns {void}
 */
export const authenticateGraphQLRoute = (req: Request): void => {
  if (!req.session?.jwt) {
    throw new GraphQLError("Please login again.");
  }
  try {
    const payload: IAuthPayload = verify(
      req.session?.jwt,
      JWT_TOKEN
    ) as IAuthPayload;
    req.currentUser = payload;
  } catch (error) {
    throw new GraphQLError("Please login again.");
  }
};

/**
 * Delays for specified number of seconds
 * @param ms Number of milliseconds to sleep for
 * @returns {Promise<void>}
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Returns a random integer between min and max (both inclusive)
 * @param min
 * @param max
 * @returns {number}
 */
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Starts all active monitors
 * @returns {Promise<void>}
 */
export const startMonitors = async (): Promise<void> => {
  const list: IMonitorDocument[] = await getAllUsersActiveMonitors();
  for (const monitor of list) {
    startCreatedMonitors(monitor, toLower(monitor.name), monitor.type);
    await sleep(getRandomInt(300, 1000));
  }
};

/**
 * Resumes a single monitor
 * @param monitorId
 * @returns {Promise<void>}
 */
export const resumeMonitors = async (monitorId: number): Promise<void> => {
  const monitor: IMonitorDocument = await getMonitorById(monitorId);
  startCreatedMonitors(monitor, toLower(monitor.name), monitor.type);
  await sleep(getRandomInt(300, 1000));
};
