import { IHeartbeat } from "@app/interfaces/heartbeat.interface";
import { getHttpHeartBeatsByDuration } from "./http.service";
import { MonitorType } from "./monitor/startCreatedMonitors";

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
    console.log("MONGO");
  }
  if (type === MonitorType.REDIS) {
    console.log("REDIS");
  }
  return heartbeats;
};
