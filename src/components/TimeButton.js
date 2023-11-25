import { React } from 'react';
import Button from '@mui/material/Button';

const TimeButton = ({ eventName, onClick }) => {
    const handleClick = () => {
        const timestamp = new Date().getTime()
        const jsonData = { "Event": eventName, "Description": null };
        localStorage.setItem(timestamp, JSON.stringify(jsonData));
        console.log("In time button. New locals storage: ")
        for (var i = 0; i < localStorage.length; i++) {
            console.log("key: ", localStorage.key(i), " val: ", localStorage.getItem(localStorage.key(i)))
        }
        onClick();
    };

    return (
        <Button variant="contained" color="secondary" style={{ width: '200px', minWidth: "100px" }} className="" onClick={() => { handleClick() }}>
            {eventName}
        </Button >
    )
}

export default TimeButton;