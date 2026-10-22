import EventsView from "@/components/events/EventsView";
import { getEvents } from "@/lib/sanity";

export const revalidate = 300;

export default async function EventsPage() {
    // If Sanity is unreachable the view falls back to fetching on the client.
    const events = await getEvents().catch(() => null);
    return <EventsView initialEvents={events as never} />;
}
