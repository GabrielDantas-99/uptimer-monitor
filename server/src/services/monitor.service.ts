import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { _createMonitor } from "./monitor/createMonitor";
import { _getAllUsersActiveMonitors } from "./monitor/getAllUsersActiveMonitors";
import { _getMonitorById } from "./monitor/getMonitorById";
import { _getUserActiveMonitors } from "./monitor/getUserActiveMonitors";

export async function createMonitor(
  data: IMonitorDocument
): Promise<IMonitorDocument> {
  return _createMonitor(data);
}

export async function getAllUsersActiveMonitors(): Promise<IMonitorDocument[]> {
  return _getAllUsersActiveMonitors();
}

export async function getMonitorById(
  monitorId: number
): Promise<IMonitorDocument> {
  return _getMonitorById(monitorId);
}

export async function getUserActiveMonitors(
  userId: number
): Promise<IMonitorDocument[]> {
  return _getUserActiveMonitors(userId);
}
