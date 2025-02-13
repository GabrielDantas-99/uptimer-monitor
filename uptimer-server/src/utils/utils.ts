import { Request } from "express";
import { GraphQLError } from "graphql";
import { IAuthPayload } from "@app/interfaces/user.interface";
import { verify } from "jsonwebtoken";
import { JWT_TOKEN } from "@app/server/config";

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
