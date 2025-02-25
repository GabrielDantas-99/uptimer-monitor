import {
  AppContext,
  IMonitorArgs,
  IMonitorDocument,
} from "@app/interfaces/monitor.interface";
import logger from "@app/server/logger";
import { createMonitor, toggleMonitor } from "@app/services/monitor.service";
import { startSingleJob, stopSingleBackgroundJob } from "@app/utils/jobs";
import { appTimeZone, authenticateGraphQLRoute } from "@app/utils/utils";

export const MonitorResolver = {
  Mutation: {
    async createMonitor(
      _: undefined,
      args: IMonitorArgs,
      contextValue: AppContext
    ) {
      const { req } = contextValue;
      authenticateGraphQLRoute(req);
      const body: IMonitorDocument = args.monitor!;
      const monitor: IMonitorDocument = await createMonitor(body);
      if (body.active && monitor?.active) {
        // TODO: start created monitor
        logger.info("start new monitor");
        startSingleJob(body.name, appTimeZone, 10, () =>
          logger.info("this is called every 10 seconds")
        );
      }
      return {
        monitors: [monitor],
      };
    },
    async toggleMonitor(
      _: undefined,
      args: IMonitorArgs,
      contextValue: AppContext
    ) {
      const { req } = contextValue;
      authenticateGraphQLRoute(req);
      const { monitorId, userId, name, active } = args.monitor!;
      const results: IMonitorDocument[] = await toggleMonitor(
        monitorId!,
        userId,
        active as boolean
      );
      //   const hasActiveMonitors: boolean = some(
      //     results,
      //     (monitor: IMonitorDocument) => monitor.active
      //   );
      /**
       * Stop auto refresh if there are no active monitors for single user
       */
      //   if (!hasActiveMonitors) {
      //     req.session = {
      //       ...req.session,
      //       enableAutomaticRefresh: false,
      //     };
      //     stopSingleBackgroundJob(`${toLower(req.currentUser?.username)}`);
      //   }
      if (!active) {
        console.log("stopSingleBackgroundJob");
        stopSingleBackgroundJob(name, monitorId!);
      } else {
        // TODO: Add a resume method here
        logger.info("Resume monitor");
        startSingleJob(name, appTimeZone, 10, () =>
          logger.info("Resumed after 10 seconds")
        );
      }
      return {
        monitors: results,
      };
    },
  },
};
