export function formatTime(seconds?: number): string {
  if (!seconds) {
    return "0:00 minutes";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")} minutes`;
}
