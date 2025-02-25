import { mergeTypeDefs } from "@graphql-tools/merge";
import { userSchema } from "./user.schema";
import { notificationSchema } from "./notification.schema";
import { monitorSchema } from "./monitor.schema";

export const mergedGQLSchema = mergeTypeDefs([
  userSchema,
  notificationSchema,
  monitorSchema,
]);
