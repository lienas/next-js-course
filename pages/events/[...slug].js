import {useRouter} from "next/router";

import {apiUrl, getEventById, getFilteredEvents, transformData} from "../../dummy-data";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from 'swr';
import {useEffect, useState} from "react";

function FiltersEventsPage(props) {
    const [allEvents, setAllEvents] = useState();

    const router = useRouter();
    const filterData = router.query.slug;

    const {data, error} = useSWR(apiUrl, url => fetch(url).then(resp => resp.json()));

    useEffect(() => {
        if (data) {
            console.log('Data::' + JSON.stringify(data,null,2));
            setAllEvents(transformData(data));
        }
    }, [data])

    if (!allEvents) {
        return <p className='center'>Loading ... </p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if ( isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12 ||
        error) {
        return (
            <>
                <ErrorAlert>
                    <p>invalid Filter !!!!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link="/events">Show all Events</Button>
                </div>
            </>
        )
    }
    const filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

    //const events = props.events;

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert>
                    <p className='center'>No Events found !!!</p><
                    /ErrorAlert>
                <div className='center'>
                    <Button link="/events">Show all Events</Button>
                </div>

            </>
        )
    }

    const date = new Date(props.numYear, props.numMonth - 1);

    return (
        <>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </>
    )
}

// export async function getServerSideProps(context) {
//     const {params} = context;
//     const filterData = params.slug;
//
//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];
//
//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;
//
//     console.log(numMonth);
//
//     if (
//         isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numYear < 2021 ||
//         numMonth < 1 ||
//         numMonth > 12
//     ) return {props: {hasError: true}}
//
//     const events = await getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     });
//
//     return {
//         props: {events, numYear, numMonth, revalidate: 10}
//     }
// }

export default FiltersEventsPage
