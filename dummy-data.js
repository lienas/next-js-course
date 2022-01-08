const DUMMY_EVENTS = [
    {
        id: 'e1',
        title: 'Programming for everyone',
        description:
            'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
        location: 'Somestreet 25, 12345 San Somewhereo',
        date: '2021-05-12',
        image: 'images/coding-event.jpg',
        isFeatured: false,
    },
    {
        id: 'e2',
        title: 'Networking for introverts',
        description:
            "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
        location: 'New Wall Street 5, 98765 New Work',
        date: '2021-05-30',
        image: 'images/introvert-event.jpg',
        isFeatured: true,
    },
    {
        id: 'e3',
        title: 'Networking for extroverts',
        description:
            'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
        location: 'My Street 12, 10115 Broke City',
        date: '2022-04-10',
        image: 'images/extrovert-event.jpg',
        isFeatured: true,
    },
];

export const apiUrl = 'https://next-33b49-default-rtdb.europe-west1.firebasedatabase.app/events.json'

export const transformData = (data) => {

    const tranformedData = [];

    for (const key in data) {
        tranformedData.push({
            id: key,
            ...data[key]
        })
    }
    ;

    return tranformedData;
}

//REFACTOR to Firebase-API
export async function getFeaturedEvents() {
    const events = await getAllEvents();

    return events.filter((event) => event.isFeatured);
}

export async function getAllEvents() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const events = transformData(data);

    return events;
}

export async function getFilteredEvents(dateFilter) {
    const {year, month} = dateFilter;
    const events = await getAllEvents();

    let filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}

export async function getEventById(id) {
    const events = await getAllEvents();
    return events.find((event) => event.id === id);
}
