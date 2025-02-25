import {
  AppContext,
  IMonitorArgs,
  IMonitorDocument,
} from "@app/interfaces/monitor.interface";
import logger from "@app/server/logger";
import {
  createMonitor,
  deleteSingleMonitor,
  toggleMonitor,
  updateSingleMonitor,
} from "@app/services/monitor.service";
import { getSingleNotificationGroup } from "@app/services/notification.service";
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
    async updateMonitor(
      _: undefined,
      args: IMonitorArgs,
      contextValue: AppContext
    ) {
      const { req } = contextValue;
      authenticateGraphQLRoute(req);
      const { monitorId, userId, monitor } = args;
      const monitors: IMonitorDocument[] = await updateSingleMonitor(
        parseInt(`${monitorId}`),
        parseInt(`${userId}`),
        monitor!
      );
      return {
        monitors,
      };
    },
    async deleteMonitor(
      _: undefined,
      args: IMonitorArgs,
      contextValue: AppContext
    ) {
      const { req } = contextValue;
      authenticateGraphQLRoute(req);
      const { monitorId, userId, type } = args;
      await deleteSingleMonitor(
        parseInt(`${monitorId}`),
        parseInt(`${userId}`),
        type!
      );
      return {
        id: monitorId,
      };
    },
  },
  MonitorResult: {
    lastChanged: (monitor: IMonitorDocument) =>
      JSON.stringify(monitor.lastChanged),
    responseTime: (monitor: IMonitorDocument) => {
      return monitor.responseTime
        ? parseInt(`${monitor.responseTime}`)
        : monitor.responseTime;
    },
    notifications: (monitor: IMonitorDocument) => {
      return getSingleNotificationGroup(monitor.notificationId!);
    },
  },
};
