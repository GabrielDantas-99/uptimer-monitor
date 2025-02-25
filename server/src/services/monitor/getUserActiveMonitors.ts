import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { getSingleNotificationGroup } from "../notification.service";
import { getHeartbeats } from "../heartbeat.service";
import { getUserMonitors } from "../monitor.service";

/**
 * Get all active monitors for a user
 * @param userId
 * @returns {Promise<IMonitorDocument[]>}
 */
export const _getUserActiveMonitors = async (
  userId: number
): Promise<IMonitorDocument[]> => {
  try {
    const monitors: IMonitorDocument[] = await getUserMonitors(userId, true);
    const updatedMonitors: IMonitorDocument[] = [];
    for (let monitor of monitors) {
      const group = await getSingleNotificationGroup(monitor.notificationId!);
      const heartbeats = await getHeartbeats(monitor.type, monitor.id!, 24);
      // TODO: Calculate uptime
      monitor = {
        ...monitor,
        uptime: 0,
        heartbeats: heartbeats.slice(0, 16),
        notifications: group,
      };
      updatedMonitors.push(monitor);
    }
    return monitors;
  } catch (error) {
    throw new Error(error);
  }
};
