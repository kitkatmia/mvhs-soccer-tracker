class GlobalRecentEvents {
    constructor() {
        console.log('well well well why am I being called')
        this.mostRecentEvents = ["No event yet", "No event yet", "No event yet"] // DEBUG: not optimized to revert yet...
    }

    addNewEvent(eventDate, eventData) {
        const date = new Date(eventDate);
        // format the time in PST
        const pstTimeString = date.toLocaleTimeString('en-US', {
            timeZone: 'America/Los_Angeles',
            hour12: false, // use 24-hour format
            hour: 'numeric',
            minute: 'numeric',
        });

        let data = eventData["Event"];
        if (eventData["Description"] !== null) {
            data = data + " - " + eventData["Description"];
        }

        console.log("shoudl eb runnign addNewEvent (previosu is: ", this.mostRecentEvents)
        const combinedString = pstTimeString + " - " + data;

        // DEBUG: not working???????

        if (this.mostRecentEvents.length === 3) {
            this.mostRecentEvents.shift(); // remove the first element
        }
        this.mostRecentEvents.push(combinedString);
    }

    get() {
        return this.mostRecentEvents;
    }
}

const mostRecentEvents = new GlobalRecentEvents();

export default mostRecentEvents;