import { React } from 'react';
import Button from '@mui/material/Button';
import "./SaveButton.css"

const SaveButton = ({ eventName, event, onClick }) => {
    const handleClick = () => {
        onClick();
        const timestamp = new Date().getTime()
        const jsonData = { "Event": eventName, "Description": event };
        localStorage.setItem(timestamp, JSON.stringify(jsonData));
        for (var i = 0; i < localStorage.length; i++) {
            console.log("In save button. Saving: ")
            console.log("key: ", localStorage.key(i), " val: ", localStorage.getItem(localStorage.key(i)))
        }
    };

    return (
        <Button variant="contained" color="success" style={{ width: "150px", position: "absolute", right: "0", bottom: "0", marginRight: "50px", marginBottom: "10px" }} className="lineup" onClick={handleClick}>
            Save Changes
        </Button >
    )
}

export default SaveButton;