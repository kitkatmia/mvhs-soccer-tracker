import JSONplayers from "../data/players.json"

class GlobalCurrentPlayers {
    constructor() {
        this.playersOn = [];
    }

    // DEBUG: for some reason, first value of playersOn is null??? when called --> even if this.playersON isn't orginally when setAll is used:(
    swapPlayers(subOutP, subInP) {
        console.log("sub in : ", subInP, " subOut : ", subOutP)
        console.log("og playersoN ", this.playersOn)
        const fieldPlayers = this.playersOn.map(player => Object.keys(player)[0]);
        console.log("soooo players.ON should be the same: ", this.playersOn)
        const index = fieldPlayers.findIndex(player => player === subOutP);

        if (index !== -1) {
            // Find the profile of the target player using the find method
            const targetProfile = JSONplayers.find((profile) => {
                return profile.playerName === subInP;
            });
            this.playersOn[index] = targetProfile;
        } else {
            console.log("\n\n keys", this.playersOn.map(player => Object.keys(player)[0]))
            console.log("uh oh. didn't find player on the field...")
        }
    }

    setAll(lineUp) {
        this.playersOn = lineUp;
        console.log("seetting players: ", lineUp, " t0: ", this.playersOn)
    }

    get() {
        return this.playersOn;
    }

    getBenchPlayers() {
        if (this.playersOn.length == 0) {
            return JSONplayers;
        }
        console.log("3255234 I wanna kill muself : ", this.playersOn)
        const allPlayers = JSONplayers.map(player => Object.keys(player)[0]);
        const fieldPlayers = this.playersOn.map(player => Object.keys(player)[0]);
        console.log("first I wanna kill muself : ", this.playersOn)

        // DEBUG: def way to optimize this using filter
        let benchers = [];
        for (let i = 0; i < allPlayers.length; i++) {
            if (!fieldPlayers.includes(allPlayers[i])) {
                benchers = [...benchers, allPlayers[i]]
            }
        }
        console.log(" second I wanna kill muself : ", this.playersOn)

        // DEBUG: filter it back to get images (super inefficient)
        const filteredData = JSONplayers.filter(item => {
            const itemName = Object.keys(item)[0];
            return benchers.includes(itemName);
        });

        console.log("I wanna kill muself : ", this.playersOn)
        return filteredData;
    }
}
const playersOnField = new GlobalCurrentPlayers();

export default playersOnField;