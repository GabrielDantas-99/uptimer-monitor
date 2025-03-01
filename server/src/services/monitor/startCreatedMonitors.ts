import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { httpStatusMonitor } from "../http.service";
import { toLower } from "lodash";
import { mongoStatusMonitor } from "../mongodb.service";
import { redisStatusMonitor } from "../redis.service";
import { tcpStatusMonitor } from "../tcp.service";

export enum MonitorType {
  HTTP = "http",
  TCP = "tcp",
  MONGO = "mongodb",
  REDIS = "redis",
}

/**
 * Start uptime monitors
 * @param monitor
 * @param name
 * @param type
 */
export const _startCreatedMonitors = (
  monitor: IMonitorDocument,
  name: string,
  type: string
): void => {
  if (type === MonitorType.HTTP) {
    httpStatusMonitor(monitor!, toLower(name));
  }
  if (type === MonitorType.TCP) {
    tcpStatusMonitor(monitor!, toLower(name));
  }
  if (type === MonitorType.MONGO) {
    mongoStatusMonitor(monitor!, toLower(name));
  }
  if (type === MonitorType.REDIS) {
    redisStatusMonitor(monitor!, toLower(name));
  }
};
