import {getFeaturedEvents} from "../dummy-data";
import EventList from "../components/events/EventList";
import events from "./events";

export default function Home(props) {
    //const featuredEvents = getFeaturedEvents()
    return (
        <div>
            <ul>
                <EventList items={props.featuredEvents}/>
            </ul>
        </div>
    )
}

export async function getStaticProps(context) {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {featuredEvents, revalidate: 10}
    }
}
