import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { _getUserMonitors } from "./getUserMonitors";

/**
 * Get all active monitors for a user
 * @param userId
 * @returns {Promise<IMonitorDocument[]>}
 */
export const _getUserActiveMonitors = async (
  userId: number
): Promise<IMonitorDocument[]> => {
  try {
    const monitors: IMonitorDocument[] = await _getUserMonitors(userId, true);
    for (const monitor of monitors) {
      console.log(monitor);
    }
    return monitors;
  } catch (error) {
    throw new Error(error);
  }
};
