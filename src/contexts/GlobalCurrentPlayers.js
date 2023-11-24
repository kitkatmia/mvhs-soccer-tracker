import JSONplayers from "../data/players.json"

class GlobalCurrentPlayers {
    constructor() {
        // DEBUG: currentGoalie isn't updating
        this.playersOn = [];
        this.goalies = ["Player 1", "Player 2"];
        this.currentGoalie = "Player 1";
    }

    getGoalie() {
        return this.currentGoalie;
    }

    setAll(lineUp) {
        if (Array.isArray(lineUp)) {
            const isValidLineUp = lineUp.every(player => typeof player === 'object' && Object.keys(player).length > 0);

            if (isValidLineUp) {
                this.playersOn = lineUp;
                for (let i = 0; i < this.goalies.length; i++) {
                    console.log("doguriogwehrg     ", this.playersOn.map(player => Object.keys(player)[0]))
                    if (this.playersOn.map(player => Object.keys(player)[0]).includes(this.goalies[i])) {
                        this.currentGoalie = this.goalies[i];
                        console.log('\n\nincludes, new goalies: ', this.currentGoalie, "\n\n")
                        break;
                    }
                }
            } else {
                console.error("Invalid lineup format. Ensure each player is an object with keys.");
            }
        } else {
            console.error("Invalid lineup format. Expected an array.");
        }
    }

    get() {
        // converting it from the format of  [{key: val}, {key: val}] to  {key: val, key: val}
        if (this.playersOn.length === 0) {
            return {};
        }

        let fieldPlayers = {}
        for (let i = 0; i < this.playersOn.length; i++) {
            let index = this.playersOn[i]
            fieldPlayers[Object.keys(index)] = Object.values(index);
        }
        return fieldPlayers;
    }

    // checkAndFixListIssue() {
    //     for (let i = 0; i < this.playersOn.length; i++) {
    //         console.log("type of obj: ", typeof this.playersOn[i], " for ", this.playersOn[i])
    //         if (Array.isArray(this.playersOn[i])) {
    //             this.playersOn[i] = { [this.playersOn[i][0]]: this.playersOn[i][1] }
    //         }
    //     }
    // }
    // DEBUG: for some reason, first value of playersOn is null??? when called --> even if this.playersON isn't orginally when setAll is used:(
    swapPlayers(subOutP, subInP) {
        // DEBUG: for some reason if this.playersOn is printed, one of the values is of the format ['Player 6', 'p4.jpeg'], instead of {}, but it still seems to be working for now, and if I try to fix the issue with another function is says it doesn't exist??
        // this.checkAndFixListIssue()
        const fieldPlayers = this.playersOn.map(player => Object.keys(player)[0]);
        // console.log("soooo players.ON should be the same: ", this.playersOn)
        const index = fieldPlayers.findIndex(player => player === subOutP);

        if (index !== -1) {
            // Find the profile of the target player using the find method
            const targetProfile = Object.entries(JSONplayers).find(([key, value]) => key === subInP)
            this.playersOn[index] = { [targetProfile[0]]: targetProfile[1] };
            if (this.goalies.includes(subOutP) && this.goalies.includes(subInP)) {
                this.currentGoalie = subInP;
            }
        } else {
            console.log("\n\n keys", this.playersOn.map(player => Object.keys(player)[0]))
            console.log("uh oh. didn't find player on the field...")
        }
    }

    getBenchPlayers() {
        if (this.playersOn.length === 0) {
            return this.JSONplayers;
        }
        const allPlayers = JSONplayers; // note that is a dict of name: img
        const fieldPlayers = this.playersOn.map(player => Object.keys(player)[0]); // note that fieldPLayers is a list of names
        let benchers = []
        for (let key in allPlayers) {
            if (!fieldPlayers.includes(key)) {
                // benchers = [...benchers, { [key]: allPlayers[key] }]
                benchers[key] = allPlayers[key]
            }
        }
        // DEBUG: def way to optimize this using filter
        // let benchers = [];
        // for (let i = 0; i < allPlayers.length; i++) {
        //     if (!fieldPlayers.includes(allPlayers[i])) {
        //         benchers = [...benchers, allPlayers[i]]
        //     }
        // }
        // console.log("third : ", this.playersOn)

        // // DEBUG: filter it back to get images (super inefficient)
        // const filteredData = this.JSONplayers.filter(item => {
        //     const itemName = Object.keys(item)[0];
        //     return benchers.includes(itemName);
        // });

        // console.log("fourth : ", this.playersOn)
        console.log("benchers: ", benchers)
        return benchers;
    }
}
const playersOnField = new GlobalCurrentPlayers();

export default playersOnField;