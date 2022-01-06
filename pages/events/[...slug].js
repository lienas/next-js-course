import {useRouter} from "next/router";

import {getFilteredEvents} from "../../dummy-data";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FiltersEventsPage() {

    const router = useRouter();
    const filterData = router.query.slug;

    if (!filterData) {
        return <p className='center'>Loading ... </p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
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

    const events = getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    if (!events || events.length === 0) {
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

    const date = new Date(numYear, numMonth - 1);

    return (
        <>
            <ResultsTitle date={date}/>
            <EventList items={events}/>
        </>
    )
}

export default FiltersEventsPage
