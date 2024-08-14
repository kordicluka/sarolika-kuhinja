// format time
// {nextWorkshop.date.toLocaleTimeString("hr-HR", {
//     hour: "2-digit",
//     minute: "2-digit",
//   })}
export function formatTime(time) {
  return time.toLocaleTimeString("hr-HR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
