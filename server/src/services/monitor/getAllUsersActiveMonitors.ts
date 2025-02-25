import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { MonitorModel } from "@app/models/monitor.model";

/**
 * Get active monitors for all users
 * @returns {Promise<IMonitorDocument[]>}
 */
export const _getAllUsersActiveMonitors = async (): Promise<
  IMonitorDocument[]
> => {
  try {
    const monitors: IMonitorDocument[] = (await MonitorModel.findAll({
      raw: true,
      where: { active: true },
      order: [["createdAt", "DESC"]],
    })) as unknown as IMonitorDocument[];
    return monitors;
  } catch (error) {
    throw new Error(error);
  }
};
