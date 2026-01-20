export function timeToMinutes(timeStr) {
  const [time, meridian] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

export function isCurrentTimeInRange(range) {
  // "10:30 - 11:30 AM"
  const [startPart, endPart] = range.split("-").map(s => s.trim());

  const startMin = timeToMinutes(startPart);
  const endMin = timeToMinutes(endPart);

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  return nowMin >= startMin && nowMin <= endMin;
}
