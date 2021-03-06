import {getAllEvents, getFeaturedEvents} from "../../dummy-data";
import {useRouter} from "next/router";

import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/events-search";
import Head from "next/head";

function AllEventsPage(props) {

    const events = props.allEvents;
    const router = useRouter();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath)
    }

    return (
        <>
            <Head>
                <title>Next Events</title>
            </Head>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList items={events}/>
        </>
    )
};

export async function getStaticProps(events) {
    const allEvents = await getAllEvents();
    return {
        props: {allEvents, revalidate: 10}
    }
};

export default AllEventsPage

