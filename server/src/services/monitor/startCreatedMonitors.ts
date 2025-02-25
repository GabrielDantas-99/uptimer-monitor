import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { httpStatusMonitor } from "../http.service";
import { toLower } from "lodash";

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
    console.log("TCP", monitor.name, name);
  }
  if (type === MonitorType.MONGO) {
    console.log("MONGO", monitor.name, name);
  }
  if (type === MonitorType.REDIS) {
    console.log("REDIS", monitor.name, name);
  }
};
