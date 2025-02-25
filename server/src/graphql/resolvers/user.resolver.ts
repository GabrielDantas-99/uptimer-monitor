import { INotificationDocument } from "@app/interfaces/notification.interface";
import { IUserDocument, IUserResponse } from "@app/interfaces/user.interface";
import { JWT_TOKEN } from "@app/server/config";
import {
  createNotificationGroup,
  getAllNotificationGroups,
} from "@app/services/notification.service";
import {
  createNewUser,
  getUserByProp,
  getUserBySocialId,
  getUserByUsernameOrEmail,
} from "@app/services/user.service";
import { GraphQLError } from "graphql";
import { sign } from "jsonwebtoken";
import { toLower, upperFirst } from "lodash";
import { Request } from "express";
import { authenticateGraphQLRoute, isEmail } from "@app/utils/utils";
import { UserModel } from "@app/models/user.model";
import { UserLoginRules } from "@app/validations";
import { AppContext } from "@app/interfaces/monitor.interface";

export const UserResolver = {
  Query: {
    async checkCurrentUser(
      _: undefined,
      __: undefined,
      contextValue: AppContext
    ) {
      const { req } = contextValue;
      authenticateGraphQLRoute(req);
      const notifications = await getAllNotificationGroups(
        req.currentUser!.id!
      );
      return {
        user: {
          id: req.currentUser?.id,
          username: req.currentUser?.username,
          email: req.currentUser?.email,
          createdAt: new Date(),
        },
        notifications,
      };
    },
  },
  Mutation: {
    async loginUser(
      _: undefined,
      args: { username: string; password: string },
      contextValue: AppContext
    ) {
      const { req } = contextValue;
      const { username, password } = args;
      await UserLoginRules.validate(
        { username, password },
        { abortEarly: false }
      );
      // TODO: validate
      const isValidEmail = isEmail(username);
      const type = !isValidEmail ? "username" : "email";
      const existingUser: IUserDocument | undefined = await getUserByProp(
        username,
        type
      );
      if (!existingUser) {
        throw new GraphQLError("Invalid credentials");
      }
      const passwordMatch: boolean = await UserModel.prototype.comparePassword(
        password,
        existingUser.password!
      );
      if (!passwordMatch) {
        throw new GraphQLError("Invalid credentials");
      }
      const response: IUserResponse = await userReturnValue(
        req,
        existingUser,
        "login"
      );
      return response;
    },
    async registerUser(
      _: undefined,
      args: { user: IUserDocument },
      contextValue: AppContext
    ) {
      const { req } = contextValue;
      const { user } = args;
      await UserLoginRules.validate(user, { abortEarly: false });
      const { username, email, password } = user;
      // TODO: Add data validation
      const checkIfUserExist: IUserDocument | undefined =
        await getUserByUsernameOrEmail(username!, email!);
      if (checkIfUserExist) {
        throw new GraphQLError("Invalid credentials. Email or username.");
      }
      const authData: IUserDocument = {
        username: upperFirst(username),
        email: toLower(email),
        password,
      } as IUserDocument;
      const result: IUserDocument | undefined = await createNewUser(authData);
      const response: IUserResponse = await userReturnValue(
        req,
        result,
        "register"
      );
      return response;
    },
    async authSocialUser(
      _: undefined,
      args: { user: IUserDocument },
      contextValue: AppContext
    ) {
      const { req } = contextValue;
      await UserLoginRules.validate(args.user, { abortEarly: false });
      const { username, email, socialId, type } = args.user;
      // TODO: Add data validation
      const checkIfUserExist: IUserDocument | undefined =
        await getUserBySocialId(socialId!, email!, type!);
      if (checkIfUserExist) {
        const response: IUserResponse = await userReturnValue(
          req,
          checkIfUserExist,
          "login"
        );
        return response;
      } else {
        const authData: IUserDocument = {
          username: upperFirst(username),
          email: toLower(email),
          ...(type === "facebook" && { facebookId: socialId }),
          ...(type === "google" && { facebookId: socialId }),
        } as IUserDocument;
        const result: IUserDocument | undefined = await createNewUser(authData);
        const response: IUserResponse = await userReturnValue(
          req,
          result,
          "register"
        );
        return response;
      }
    },
    logout(_: undefined, __: undefined, contextValue: AppContext) {
      const { req } = contextValue;
      req.session = null;
      req.currentUser = undefined;
      return null;
    },
  },
  User: {
    createdAt: (user: IUserDocument) =>
      new Date(`${user.createdAt}`).toISOString(),
  },
};

async function userReturnValue(
  req: Request,
  result: IUserDocument,
  type: string
): Promise<IUserResponse> {
  let notifications: INotificationDocument[] = [];
  if (type === "register" && result && result.id && result.email) {
    const notification = await createNotificationGroup({
      userId: result.id,
      groupName: "Default Contact Group",
      emails: JSON.stringify([result.email]),
    });
    notifications.push(notification);
  } else if (type === "login" && result && result.id && result.email) {
    notifications = await getAllNotificationGroups(result.id);
  }
  const userJwt: string = sign(
    {
      id: result.id,
      email: result.email,
      username: result.username,
    },
    JWT_TOKEN
  );
  req.session = { jwt: userJwt, enableAutomaticRefresh: false };
  const user: IUserDocument = {
    id: result.id,
    email: result.email,
    username: result.username,
    createdAt: result.createdAt,
  } as IUserDocument;
  return {
    user,
    notifications,
  };
}
