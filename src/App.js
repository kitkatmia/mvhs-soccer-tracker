import React, { useState, useEffect } from 'react';
import './App.css';
// data
import playersOnField from './contexts/GlobalCurrentPlayers';
import spartansLogo from './images/spartansLogo.png';
// components
import Grid from '@mui/material/Grid';
import LineUp from './components/LineUp';
import gameDates from "./data/game_dates.json";
import TimeButton from './components/TimeButton';
import { Button } from '@mui/material';
import DoubleModal from './components/DoubleModal';
// theme
import { ThemeProvider } from '@mui/material/styles';
import customTheme from "./utils/Theme.js"


function App() {
  const [data, setData] = useState({});
  const [date, setDate] = useState("Null");
  const [fileName, setFileName] = useState("test");

  const [notStarted, setNotStarted] = useState(true);
  const [paused, setPaused] = useState(false);

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
  }, [date, data]); // keep dependencies!! --> otherwise this runs after you click button and eareses events :(

  const handleStartAndStop = () => {
    if (notStarted) {
      setNotStarted(false);
    } else {
      downloadLocalStorage();
    }
  }

  const handleGKClick = () => {
    const timestamp = new Date().getTime()
    const jsonData = { "Event": process.env.REACT_APP_GK_SAVE_EVENT, "Description": playersOnField.getGoalie() };
    localStorage.setItem(timestamp, JSON.stringify(jsonData));
    for (var i = 0; i < localStorage.length; i++) {
      console.log("In app.js button. Saving gk event: ")
      console.log("key: ", localStorage.key(i), " val: ", localStorage.getItem(localStorage.key(i)))
    }
  }

  const downloadLocalStorage = () => {
    console.log("should be downloading.... lenght is : ", localStorage)
    const localStorageData = {};

    // iterates through keys, save in storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log('key: ', key, " val: ", JSON.parse(localStorage.getItem(key)))
      localStorageData[key] = JSON.parse(localStorage.getItem(key));
    }

    // object to a JSON string
    const jsonData = JSON.stringify(localStorageData);

    // blob containing the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // temporary anchor element to trigger the download
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName + '.json';

    // // append the anchor to the body and trigger a click to start the download
    // document.body.appendChild(a);
    // a.click();

    // // remove the temporary anchor
    // document.body.removeChild(a);

    // // revoke the Blob URL to free up resources
    // URL.revokeObjectURL(url);
  };

  const handlePause = () => {
    setPaused(!paused);
  }

  // update to match new functionalities!
  const handleRevert = () => {
    if (localStorage.length > 0) {
      const keys = Object.keys(localStorage).map(Number);
      console.log("ekys: ", keys)
      // get most recent time (last action)
      const lastKey = Math.max(...keys);
      const lastEvent = JSON.parse(localStorage.getItem(lastKey))["Event"];
      console.log("eky: ", lastEvent)
      if (lastEvent === process.env.REACT_APP_PAUSE_EVENT || lastEvent === process.env.REACT_APP_UNPAUSE_EVENT) {
        handlePause();
      } else if (lastEvent === process.env.REACT_APP_START_EVENT) {
        setNotStarted(!notStarted); // don't need to do anything for end_event because there's no event after it
      } else if (lastEvent === process.env.REACT_APP_LINEUP_EVENT_1 || lastEvent === process.env.REACT_APP_LINEUP_EVENT_2) {
        playersOnField.setAll([]); // DEBUG: what happens if you accidently set second half lineup during first half? --> have to redo first half lineup, which is annoying
        console.log("shoulda removed app lineup") // issue: not removing app lineup --> new names are just getting appended
      }
      localStorage.removeItem(lastKey);
      console.log("val of reverted val: ", localStorage.getItem(lastKey))
    }
  }

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <div style={{ display: "flex", flexDirection: 'row' }}>
          <div style={{ alignItems: 'center' }}>
            {/* fix spacing so it's dynamic and fits on phone */}
            <img src={spartansLogo} alt="spartans-logo" style={{ width: 50, height: 50, marginRight: 220, marginLeft: 10, marginTop: 10 }} />
          </div>
          <h1 style={{ justifyContent: 'center' }}>Spartan Soccer Tracking App</h1>
        </div>
        <Grid container justifyContent="center" alignItems="center" rowSpacing={1}>
          {notStarted &&
            <Grid item>
              <TimeButton eventName={process.env.REACT_APP_START_EVENT} onClick={() => handleStartAndStop()} />
            </Grid>
          }
          {!notStarted &&
            <Grid item>
              <TimeButton eventName={process.env.REACT_APP_END_EVENT} onClick={() => handleStartAndStop()} />
            </Grid>
          }
          {!paused &&
            <Grid item>
              <TimeButton eventName={process.env.REACT_APP_PAUSE_EVENT} onClick={() => handlePause()} />
            </Grid>
          }
          {paused &&
            <Grid item>
              <TimeButton eventName={process.env.REACT_APP_UNPAUSE_EVENT} onClick={() => handlePause()} />
            </Grid>
          }
          <Grid item>
            <LineUp eventName={process.env.REACT_APP_LINEUP_EVENT_1} type="Select First-Half Line Up" description="Click to select starters" color="primary" buttonStyle={{ width: '200px', minWidth: "100px", marginRight: "10vh" }} />
          </Grid>
          <Grid item>
            <LineUp eventName={process.env.REACT_APP_LINEUP_EVENT_2} type="Select Second-Half Line Up" description="Click to select starters" color="secondary" buttonStyle={{ width: '200px', minWidth: "100px", marginRight: "10vh" }} />
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" style={{ width: "250px" }} onClick={() => handleRevert()}>Revert last action</Button>
          </Grid>
          <Grid item>
            <DoubleModal eventName={process.env.REACT_APP_GOAL_EVENT} eventName2={process.env.REACT_APP_ASSIST_EVENT} type={process.env.REACT_APP_GOAL_TYPE} descriptionPanel1="Select Goal Scorer" descriptionPanel2="Select assister" color="secondary" buttonStyle={{ width: '200px', minWidth: "100px", marginRight: "10vh" }} />
          </Grid>
          <Grid item>
            <DoubleModal eventName={process.env.REACT_APP_SUB_IN_EVENT} eventName2={process.env.REACT_APP_SUB_OUT_EVENT} type={process.env.REACT_APP_SUB_TYPE} descriptionPanel1="Select Player to Sub In" descriptionPanel2="Select Player to Sub Out" color="secondary" buttonStyle={{ width: '200px', minWidth: "100px", marginRight: "10vh" }} />
          </Grid>
          <Grid item>
            {/* custom theme example below */}
            <Button variant="contained" color="violet" onClick={handleGKClick}>GK Save</Button>
          </Grid>
        </Grid>
      </div >
    </ThemeProvider>
  );
}

export default App;
