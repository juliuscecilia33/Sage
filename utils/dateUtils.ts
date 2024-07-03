import { formatDistanceToNow } from "date-fns";

export const formatTimestamp = (timestamp: string): string => {
  console.log("timestamp coming in", timestamp);
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
};
