import { MongoDBModel } from "@app/models/mongodb.model";
import { MonitorType } from "../enums/MonitorType.enum";

export const _deleteMonitorTypeHeartbeats = async (
  monitorId: number,
  type: string
): Promise<void> => {
  let model = null;
  if (type === MonitorType.MONGO) {
    model = MongoDBModel;
  }
  if (model !== null) {
    await model.destroy({
      where: { monitorId },
    });
  }
};
