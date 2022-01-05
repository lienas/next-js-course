import {getAllEvents} from "../../dummy-data";

function AllEventsPage() {
    return (
        <div>
            <h1>Events Page</h1>
            {getAllEvents().map(event =>
            <h2>{event.title}</h2>
            ) }
        </div>
    )
}

export default AllEventsPage
