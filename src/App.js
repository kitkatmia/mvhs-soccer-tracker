import React, { useState, useEffect } from 'react';
import spartansLogo from './images/spartansLogo.png';
// import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LineUp from './components/LineUp';
import gameDates from "./data/game_dates.json"
import TimeButton from './components/TimeButton';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [date, setDate] = useState("Null");
  const [fileName, setFileName] = useState("test");

  const [notStarted, setNotStarted] = useState(true);
  const handleStarted = () => {
    setNotStarted(false);
  }

  const downloadLocalStorage = () => {
    console.log("should be downloading.... lenght is : ", localStorage)
    const localStorageData = {};

    // Iterate over all keys in local storage and save the values in an object
    for (let i = 0; i < localStorage.length; i++) {
      console.log('key: ', localStorage[i], " val: ", JSON.parse(localStorage.getItem(localStorage[i])))
      const key = localStorage.key(i);
      localStorageData[key] = JSON.parse(localStorage.getItem(key));
    }

    // Convert the object to a JSON string
    const jsonData = JSON.stringify(localStorageData);

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName + '.json';

    // Append the anchor to the body and trigger a click to start the download
    // document.body.appendChild(a);
    // a.click();

    // // Remove the temporary anchor
    // document.body.removeChild(a);

    // // Revoke the Blob URL to free up resources
    // URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // clear local storage on app open
    localStorage.clear();

    const fetchData = async () => {
      try {
        setData(gameDates);

        let today = new Date();
        let todayDate = parseInt(today.getMonth() + 1) + "/" + + today.getDate() + "/" + today.getFullYear();
        setDate(todayDate);

        if (data[date]) {
          const f = todayDate + "_" + data[date].join("_");
          setFileName(f);
        }

      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  });

  return (
    <div>
      <div style={{ display: "flex", flexDirection: 'row' }}>
        <div style={{ alignItems: 'center' }}>
          {/* fix spacing so it's dynamic and fits on phone */}
          <img src={spartansLogo} alt="spartans-logo" style={{ width: 50, height: 50, marginRight: 220, marginLeft: 10, marginTop: 10 }} />
        </div>
        <h1 style={{ justifyContent: 'center' }}>Spartan Soccer Tracking App</h1>
      </div>
      <Grid container justifyContent="center" alignItems="center" rowSpacing={1}>
        <Grid item>
          <LineUp eventName={process.env.REACT_APP_LINEUP_EVENT_2} fileName={fileName} type="Select Second-Half Line Up" description="Click to select starters" color="secondary" buttonStyle={{ width: '200px', minWidth: "100px", marginRight: "10vh" }} />
        </Grid>
        <Grid item>
          <LineUp eventName={process.env.REACT_APP_LINEUP_EVENT_1} fileName={fileName} type="Select First-Half Line Up" description="Click to select starters" color="primary" buttonStyle={{ width: '200px', minWidth: "100px", marginRight: "10vh" }} />
          {/* <Button variant="contained" color="primary" style={{ width: '200px', minWidth: "100px", marginRight: "10vh" }}> */}
          {/* Select First-Half LineUp
          </Button> */}
        </Grid>
        {notStarted &&
          <Grid item>
            <TimeButton eventName={process.env.REACT_APP_START_EVENT} onClick={() => handleStarted()} />
          </Grid>
        }
        {!notStarted &&
          <Grid item>
            <TimeButton eventName={process.env.REACT_APP_END_EVENT} onClick={() => downloadLocalStorage()} />
          </Grid>
        }


      </Grid>
    </div >
  );
}

export default App;
