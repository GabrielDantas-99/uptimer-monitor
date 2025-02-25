import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { MonitorModel } from "@app/models/monitor.model";
import { getSingleNotificationGroup } from "../notification.service";

/**
 * Get monitor by id
 * @param monitorId
 * @returns {Promise<IMonitorDocument>}
 */
export const _getMonitorById = async (
  monitorId: number
): Promise<IMonitorDocument> => {
  try {
    const monitor: IMonitorDocument = (await MonitorModel.findOne({
      raw: true,
      where: { id: monitorId },
    })) as unknown as IMonitorDocument;
    let updatedMonitor: IMonitorDocument = { ...monitor };
    const notifications = await getSingleNotificationGroup(
      updatedMonitor.notificationId!
    );
    updatedMonitor = { ...updatedMonitor, notifications };
    return updatedMonitor;
  } catch (error) {
    throw new Error(error);
  }
};
