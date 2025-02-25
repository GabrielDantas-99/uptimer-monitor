import { IHeartbeat } from "@app/interfaces/heartbeat.interface";
import { getMongoHeartBeatsByDuration } from "../mongodb.service";
import { MonitorType } from "../enums/MonitorType.enum";

/**
 * Get monitor heartbeats
 * @param type
 * @param monitorId
 * @param duration
 * @returns {Promise<IHeartbeat[]>}
 */
export const _getHeartbeats = async (
  type: string,
  monitorId: number,
  duration: number
): Promise<IHeartbeat[]> => {
  let heartbeats: IHeartbeat[] = [];

  if (type === MonitorType.HTTP) {
    console.log("getHttpHeartBeatsByDuration");
  }
  if (type === MonitorType.TCP) {
    console.log("getTcpHeartBeatsByDuration");
  }
  if (type === MonitorType.MONGO) {
    heartbeats = await getMongoHeartBeatsByDuration(monitorId, duration);
  }
  if (type === MonitorType.REDIS) {
    console.log("getRedisHeartBeatsByDuration");
  }
  return heartbeats;
};
