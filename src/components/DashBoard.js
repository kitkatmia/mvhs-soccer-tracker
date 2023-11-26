import { React, useEffect, useState } from 'react';
import Box from '@mui/system/Box';
import "./SaveButton.css"
import customTheme from "../utils/Theme.js"
import recentEvents from '../contexts/GlobalRecentEvents';


const Dashboard = ({ update }) => {
    const [recentEventsCatalog, setRecentEventsCatalog] = useState(recentEvents.get().reverse()); // to get most recent events from the top

    useEffect(() => {
        console.log("runnning \n\n\n")
        console.log("\n\n events rn: \n", recentEvents.get().reverse())
        setRecentEventsCatalog(recentEvents.get().reverse());

        // Set localStorage item when the component mounts and add storage event listener
        const handleStorageChange = () => {
            setRecentEventsCatalog(recentEvents.get().reverse());
        };

        window.addEventListener('storage-changed', handleStorageChange);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage-changed', handleStorageChange);
        }
    }, [update]);

    return (
        <Box style={{
            width: "600px", height: "200px", background: customTheme.palette.secondary.main, margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
        }}>
            {/* DEBUG: want h1 to be centered but bullet points to be left-aligned */}
            <h1 style={{ marginTop: "0px", marginBottom: "0" }}>Most recent actions</h1>
            {
                <ul>
                    {recentEventsCatalog.map((event, index) => (
                        <li key={index} style={{ fontSize: "18px" }}>
                            {event}
                        </li>
                    ))}
                </ul>
            }
        </Box >
    )
}

// return (
//     <Button variant="contained" color="success" style={{ width: "150px", position: "absolute", right: "0", bottom: "0", marginRight: "50px", marginBottom: "10px" }} className="lineup" onClick={onClick()}>
//         Save Changes
//     </Button >
// )

export default Dashboard;