import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { MonitorModel } from "@app/models/monitor.model";
import { Model } from "sequelize";

/**
 * Create a new monitor
 * @param data
 * @returns {Promise<IMonitorDocument>}
 */
export const _createMonitor = async (
  data: IMonitorDocument
): Promise<IMonitorDocument> => {
  try {
    const result: Model = await MonitorModel.create(data);
    return result.dataValues;
  } catch (error) {
    throw new Error(error);
  }
};
