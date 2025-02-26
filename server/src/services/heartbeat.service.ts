import { IHeartbeat } from "@app/interfaces/heartbeat.interface";
import { getHttpHeartBeatsByDuration } from "./http.service";
import { MonitorType } from "./monitor/startCreatedMonitors";
import { HttpModel } from "@app/models/http.model";
import { getMongoHeartBeatsByDuration } from "./mongodb.service";
import { getRedisHeartBeatsByDuration } from "./redis.service";

/**
 * Get monitor heartbeats
 * @param type
 * @param monitorId
 * @param duration
 * @returns {Promise<IHeartbeat[]>}
 */
export const getHeartbeats = async (
  type: string,
  monitorId: number,
  duration: number
): Promise<IHeartbeat[]> => {
  let heartbeats: IHeartbeat[] = [];
  if (type === MonitorType.HTTP) {
    heartbeats = await getHttpHeartBeatsByDuration(monitorId, duration);
  }
  if (type === MonitorType.TCP) {
    console.log("TCP");
  }
  if (type === MonitorType.MONGO) {
    heartbeats = await getMongoHeartBeatsByDuration(monitorId, duration);
  }
  if (type === MonitorType.REDIS) {
    heartbeats = await getRedisHeartBeatsByDuration(monitorId, duration);
  }
  return heartbeats;
};

export const deleteMonitorTypeHeartbeats = async (
  monitorId: number,
  type: string
): Promise<void> => {
  let model = null;
  if (type === MonitorType.HTTP) {
    model = HttpModel;
  }
  if (model !== null) {
    await model.destroy({
      where: { monitorId },
    });
  }
};
