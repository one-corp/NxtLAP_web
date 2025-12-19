import { Event } from "@/types/Event";

export function generateGoogleCalendarUrl(event: Event): string {
    const { strEvent, strTimestamp, strVenue, strLeague } = event;
    const startDate = new Date(strTimestamp);
    // Default duration: 2 hours
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const format = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const start = format(startDate);
    const end = format(endDate);

    const title = encodeURIComponent(`${strLeague}: ${strEvent}`);
    const location = encodeURIComponent(strVenue);
    const details = encodeURIComponent(`Watch ${strEvent} (${strLeague}) at ${strVenue}.`);

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
}
