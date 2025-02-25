import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { _createMonitor } from "./monitor/createMonitor";
import { _getAllUsersActiveMonitors } from "./monitor/getAllUsersActiveMonitors";
import { _getMonitorById } from "./monitor/getMonitorById";
import { _getUserActiveMonitors } from "./monitor/getUserActiveMonitors";
import { _toggleMonitor } from "./monitor/toggleMonitor";
import { _updateMonitorStatus } from "./monitor/updateMonitorStatus";
import { _deleteSingleMonitor } from "./monitor/deleteSingleMonitor";
import { _updateSingleMonitor } from "./monitor/updateSingleMonitor";

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

export async function toggleMonitor(
  monitorId: number,
  userId: number,
  active: boolean
): Promise<IMonitorDocument[]> {
  return _toggleMonitor(monitorId, userId, active);
}

export async function updateSingleMonitor(
  monitorId: number,
  userId: number,
  data: IMonitorDocument
): Promise<IMonitorDocument[]> {
  return _updateSingleMonitor(monitorId, userId, data);
}

export async function updateMonitorStatus(
  monitor: IMonitorDocument,
  timestamp: number,
  type: string
): Promise<IMonitorDocument> {
  return _updateMonitorStatus(monitor, timestamp, type);
}

export async function deleteSingleMonitor(
  monitorId: number,
  userId: number,
  type: string
): Promise<IMonitorDocument[]> {
  return _deleteSingleMonitor(monitorId, userId, type);
}
