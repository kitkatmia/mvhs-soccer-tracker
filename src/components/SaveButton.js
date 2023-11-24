import { React } from 'react';
import Button from '@mui/material/Button';
import "./SaveButton.css"



const SaveButton = ({ eventName, event, onClick, eventName2 = null, event2 = null, condition = true }) => {
    const handleClick = () => {
        console.log("eventname: ", eventName, " event: ", event)
        if (eventName2) {
            console.log("eventname2: ", eventName2, " event: ", event2)
        }
        onClick();
        const timestamp = new Date().getTime()
        const jsonData = { "Event": eventName, "Description": event };
        localStorage.setItem(timestamp, JSON.stringify(jsonData));
        if (eventName2) {
            const jsonData2 = { "Event": eventName2, "Description": event2 };
            localStorage.setItem(timestamp + 1, JSON.stringify(jsonData2)); // plus 1 = add 1 millisecond since time is the key --> otherwise goal will be overwritten and not saved... :(
        }
        for (var i = 0; i < localStorage.length; i++) {
            console.log("In save button. Saving: ")
            console.log("key: ", localStorage.key(i), " val: ", localStorage.getItem(localStorage.key(i)))
        }
    };

    return (
        <Button variant="contained" color="success" style={{ width: "150px", position: "absolute", right: "0", bottom: "0", marginRight: "20px", marginBottom: "10px" }} className="lineup" onClick={condition ? handleClick : null}>
            Save Changes
        </Button >
    )
}

// return (
//     <Button variant="contained" color="success" style={{ width: "150px", position: "absolute", right: "0", bottom: "0", marginRight: "50px", marginBottom: "10px" }} className="lineup" onClick={onClick()}>
//         Save Changes
//     </Button >
// )

export default SaveButton;