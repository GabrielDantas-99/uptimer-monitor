import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { MonitorModel } from "@app/models/monitor.model";
import { _getUserMonitors } from "./getUserMonitors";

/**
 * Delete a single monitor with its associated heartbeats
 * @param monitorId
 * @param userId
 * @param type
 * @returns {Promise<IMonitorDocument[]>}
 */
export const _deleteSingleMonitor = async (
  monitorId: number,
  userId: number,
  type: string
): Promise<IMonitorDocument[]> => {
  try {
    await deleteMonitorTypeHeartbeats(monitorId, type);
    await MonitorModel.destroy({
      where: { id: monitorId },
    });
    const result: IMonitorDocument[] = await _getUserMonitors(userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteMonitorTypeHeartbeats = async (
  monitorId: number,
  type: string
): Promise<void> => {
  // TODO: Delete monitor heartbeats
  console.log(monitorId, type);
};
