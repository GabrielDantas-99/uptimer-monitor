import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { MonitorType } from "../enums/MonitorType.enum";
import { mongoStatusMonitor } from "../mongodb.service";
import { toLower } from "lodash";

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
    console.log("HTTP", monitor.name, name);
  }
  if (type === MonitorType.TCP) {
    console.log("TCP", monitor.name, name);
  }
  if (type === MonitorType.MONGO) {
    mongoStatusMonitor(monitor!, toLower(name));
  }
  if (type === MonitorType.REDIS) {
    console.log("REDIS", monitor.name, name);
  }
};
