import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { MonitorModel } from "@app/models/monitor.model";
import { _getUserMonitors } from "./getUserMonitors";

/**
 * Update single monitor
 * @param monitorId
 * @param userId
 * @param data
 * @returns {Promise<IMonitorDocument[]>}
 */
export const _updateSingleMonitor = async (
  monitorId: number,
  userId: number,
  data: IMonitorDocument
): Promise<IMonitorDocument[]> => {
  try {
    await MonitorModel.update(data, {
      where: { id: monitorId },
    });
    const result: IMonitorDocument[] = await _getUserMonitors(userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
