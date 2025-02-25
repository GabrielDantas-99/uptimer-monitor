import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { _createMonitor } from "./monitor/createMonitor";
import { _getAllUsersActiveMonitors } from "./monitor/getAllUsersActiveMonitors";
import { _getMonitorById } from "./monitor/getMonitorById";
import { _getUserActiveMonitors } from "./monitor/getUserActiveMonitors";
import { _toggleMonitor } from "./monitor/toggleMonitor";
import { _updateMonitorStatus } from "./monitor/updateMonitorStatus";
import { _deleteSingleMonitor } from "./monitor/deleteSingleMonitor";
import { _updateSingleMonitor } from "./monitor/updateSingleMonitor";
import { _getUserMonitors } from "./monitor/getUserMonitors";
import { _startCreatedMonitors } from "./monitor/startCreatedMonitors";
import { IHeartbeat } from "@app/interfaces/heartbeat.interface";
import { _getHeartbeats } from "./monitor/getHeartBeats";
import { _deleteMonitorTypeHeartbeats } from "./monitor/deleteMonitorTypeHeartbeats";

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

export async function getUserMonitors(
  userId: number,
  active?: boolean
): Promise<IMonitorDocument[]> {
  return _getUserMonitors(userId, active);
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

export async function startCreatedMonitors(
  monitor: IMonitorDocument,
  name: string,
  type: string
): Promise<void> {
  return _startCreatedMonitors(monitor, name, type);
}

export async function deleteMonitorTypeHeartbeats(
  monitorId: number,
  type: string
): Promise<void> {
  return _deleteMonitorTypeHeartbeats(monitorId, type);
}

export async function getHeartbeats(
  type: string,
  monitorId: number,
  duration: number
): Promise<IHeartbeat[]> {
  return _getHeartbeats(type, monitorId, duration);
}
