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

        console.log("shoudl eb runnign")
        const combinedString = pstTimeString + " - " + data;

        // DEBUG: not working???????

        this.mostRecentEvents[0] = this.mostRecentEvents[1]
        this.mostRecentEvents[1] = this.mostRecentEvents[2];
        this.mostRecentEvents[2] = combinedString

        // this.mostRecentEvents.push(combinedString);
        // console.log("pushed, ", this.mostRecentEvents)
        // if (this.mostRecentEvents.length > 3) {
        //     this.mostRecentEvents.shift();
        //     console.log("shifted, ", this.mostRecentEvents)

        // }
        // console.log('new data added, now: ', this.mostRecentEvents)

        // dispatch event:
        window.dispatchEvent(new Event("storage-changed"));
    }

    get() {
        return this.mostRecentEvents;
    }
}

const mostRecentEvents = new GlobalRecentEvents();

export default mostRecentEvents;