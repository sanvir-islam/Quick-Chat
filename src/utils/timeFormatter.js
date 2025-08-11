// src/utils/timeFormatter.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime); // Add the relativeTime plugin

// Function to format the timestamp into a readable time format
export function formatMessageTime(timestamp) {
  const now = dayjs(); // Current time
  const messageTime = dayjs(timestamp); // Timestamp of the message

  // If the message was sent within the last hour, show the relative time
  if (messageTime.isSame(now, "day")) {
    if (messageTime.isSame(now, "hour")) {
      return messageTime.fromNow(); // Show like '10 minutes ago'
    } else {
      return `Today at ${messageTime.format("hh:mm A")}`; // Show like 'Today at 5:20 PM'
    }
  }

  // If the message was sent yesterday, show 'Yesterday'
  if (messageTime.isSame(now.subtract(1, "day"), "day")) {
    return "Yesterday";
  }

  // For older messages, use the relative time format
  return messageTime.fromNow(); // Show like '3 days ago'
}
