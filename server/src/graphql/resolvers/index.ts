import { HeartbeatResolver } from "./heartbeats.resolver";
import { MonitorResolver } from "./monitor.resolver";
import { NotificationResolver } from "./notification.resolver";
import { UserResolver } from "./user.resolver";

export const resolvers = [
  UserResolver,
  NotificationResolver,
  MonitorResolver,
  HeartbeatResolver,
];
