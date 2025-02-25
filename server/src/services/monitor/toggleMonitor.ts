import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { MonitorModel } from "@app/models/monitor.model";
import { Op } from "sequelize";
import { _getUserMonitors } from "./getUserMonitors";

/**
 * Toggle active/inactive monitor
 * @param monitorId
 * @param userId
 * @param active
 * @returns {Promise<IMonitorDocument[]>}
 */
export const _toggleMonitor = async (
  monitorId: number,
  userId: number,
  active: boolean
): Promise<IMonitorDocument[]> => {
  try {
    await MonitorModel.update(
      { active },
      {
        where: {
          [Op.and]: [{ id: monitorId }, { userId }],
        },
      }
    );
    const result: IMonitorDocument[] = await _getUserMonitors(userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
