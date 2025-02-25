import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { MonitorModel } from "@app/models/monitor.model";
import { Op } from "sequelize";

/**
 * Get either all monitors (active or inactive) or just active for a user
 * @param userId
 * @param active
 * @returns
 */
export const _getUserMonitors = async (
  userId: number,
  active?: boolean
): Promise<IMonitorDocument[]> => {
  try {
    const monitors: IMonitorDocument[] = (await MonitorModel.findAll({
      raw: true,
      where: {
        [Op.and]: [
          {
            userId,
            ...(active && {
              active: true,
            }),
          },
        ],
      },
      order: [["createdAt", "DESC"]],
    })) as unknown as IMonitorDocument[];
    return monitors;
  } catch (error) {
    throw new Error(error);
  }
};
