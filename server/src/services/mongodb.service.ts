import { IHeartbeat } from "@app/interfaces/heartbeat.interface";
import { IMonitorDocument } from "@app/interfaces/monitor.interface";
import { MongoDBModel } from "@app/models/mongodb.model";
import { mongoDBMonitor } from "@app/monitors/mongodb.monitor";
import { startSingleJob } from "@app/utils/jobs";
import { appTimeZone } from "@app/utils/utils";
import dayjs from "dayjs";
import { Model, Op } from "sequelize";

export const createMongoHeartBeat = async (
  data: IHeartbeat
): Promise<IHeartbeat> => {
  try {
    const result: Model = await MongoDBModel.create(data);
    return result.dataValues;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMongoHeartBeatsByDuration = async (
  monitorId: number,
  duration = 24
): Promise<IHeartbeat[]> => {
  try {
    const dateTime: Date = dayjs.utc().toDate();
    dateTime.setHours(dateTime.getHours() - duration);
    const heartbeats: IHeartbeat[] = (await MongoDBModel.findAll({
      raw: true,
      where: {
        [Op.and]: [
          { monitorId },
          {
            timestamp: {
              [Op.gte]: dateTime,
            },
          },
        ],
      },
      order: [["timestamp", "DESC"]],
    })) as unknown as IHeartbeat[];
    return heartbeats;
  } catch (error) {
    throw new Error(error);
  }
};

export const mongoStatusMonitor = (
  monitor: IMonitorDocument,
  name: string
): void => {
  const mongoMonitorData: IMonitorDocument = {
    monitorId: monitor.id,
    url: monitor.url,
  } as IMonitorDocument;
  startSingleJob(name, appTimeZone, monitor.frequency, async () =>
    mongoDBMonitor.start(mongoMonitorData)
  );
};
