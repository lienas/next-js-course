import {useRouter} from "next/router";
import {getEventById, getFeaturedEvents} from "../../dummy-data";
import {Fragment} from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
    const router = useRouter();

    //const eventId = router.query.eventId;
    const event = props.event;

    if (!event) {
        return (
            <ErrorAlert>
                <p>No event found !!!</p><
            /ErrorAlert>
        )
    }

    return (
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const {params} = context;
    const event = await getEventById(params.eventId);
    return {
        props: {event, revalidate: 10}
    }
}


export default EventDetailPage
