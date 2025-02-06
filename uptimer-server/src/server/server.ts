import http from "http";

import {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import {
  CLIENT_URL,
  NODE_ENV,
  PORT,
  SECRET_KEY_ONE,
  SECRET_KEY_TWO,
} from "./config";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { Envs } from "@app/models/enums/envs";
import cookieSession from "cookie-session";
import { expressMiddleware } from "@apollo/server/express4";
import logger from "./logger";

// TESTS
const typeDefs = `#graphql
  type User {
    username: String
  }

  type Query {
    user: User
  }
`;
const resolvers = {
  Query: {
    user() {
      return { username: "Gabriel" };
    },
  },
};

export default class MonitorServer {
  private app: Express;
  private httpServer: http.Server;
  private server: ApolloServer;

  constructor(app: Express) {
    this.app = app;
    this.httpServer = new http.Server(app);
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    this.server = new ApolloServer({
      schema,
      introspection: NODE_ENV !== Envs.PROD,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
        NODE_ENV === Envs.PROD
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    });
  }

  async start(): Promise<void> {
    /**
     * Note that you must call the start() method on the ApolloServer
     * instance before passing the instance to expressMiddleware
     */
    await this.server.start(); // Only if using expressMiddleWare (not startStandaloneServer)
    this.standartMiddleware(this.app);
    this.startServer();
  }

  private standartMiddleware(app: Express): void {
    app.set("trust proxy", 1);
    app.use((_req: Request, res: Response, next: NextFunction) => {
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      next();
    });
    app.use(
      cookieSession({
        name: "session",
        keys: [SECRET_KEY_ONE, SECRET_KEY_TWO],
        maxAge: 24 * 7 * 3600000,
        secure: NODE_ENV !== Envs.DEV,
        ...(NODE_ENV !== Envs.DEV && {
          sameSite: "none",
        }),
      })
    );
    this.graphqlRoute(app);
    this.healthRoute(app);
  }

  private graphqlRoute(app: Express): void {
    app.use(
      "/graphql",
      cors({ origin: CLIENT_URL, credentials: true }),
      json({ limit: "200mb" }),
      urlencoded({ extended: true, limit: "200mb" }),
      expressMiddleware(this.server, {
        context: async ({ req, res }: { req: Request; res: Response }) => {
          return { req, res };
        },
      })
    );
  }
  private healthRoute(app: Express): void {
    app.get("/health", (_req: Request, res: Response) => {
      res.status(200).send("Uptimer monitor service is healthy and OK.");
    });
  }

  private async startServer(): Promise<void> {
    try {
      const SERVER_PORT: number = parseInt(PORT!, 10) || 5000;
      logger.info(`Server has started with process id ${process.pid}`);
      this.httpServer.listen(SERVER_PORT, () => {
        logger.info(`Server running on port ${SERVER_PORT}`);
      });
    } catch (error) {
      logger.error("error", "startServer() error method: ", error);
    }
  }
}
