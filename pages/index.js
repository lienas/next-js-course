import {getFeaturedEvents} from "../dummy-data";
import EventList from "../components/events/EventList";
import Head from "next/head";

export default function Home(props) {
    //const featuredEvents = getFeaturedEvents()
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta name="description" content="Find events for everything and everybody"/>
            </Head>
            <EventList items={props.featuredEvents}/>
        </div>
    )
}

export async function getStaticProps(context) {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {featuredEvents, revalidate: 10}
    }
}
