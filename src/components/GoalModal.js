import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PlayerCircle from './PlayerCircle';
import playersJSON from "../data/players.json";
import SaveButton from './SaveButton';

const GoalModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedName, setSelectedName] = useState("");
    const [players, setPlayers] = useState({})

    const handlePlayerClick = (playerName) => {
        // DEBUG: high-key buggy --> sometimes on de-select, can't reselect some profiles until many clicks (not sure why, most likely interplay between isSelected and isClicked field)
        setSelectedName(playerName);
    }

    useEffect(() => {
        const getStarters = () => {
            // DEBUG: revert doesn't work with this (adds previous and new)
            console.log("running...")
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                console.log('key: ', key, " val: ", JSON.parse(localStorage.getItem(key)))
                const valuesDict = JSON.parse(localStorage.getItem(key)) || {}
                if (valuesDict["Event"] === process.env.REACT_APP_LINEUP_EVENT_2) {
                    console.log("equal to half 2, ", toDictionary(valuesDict["Description"]))
                    setPlayers(toDictionary(valuesDict["Description"]));
                    return;
                } else if (valuesDict["Event"] === process.env.REACT_APP_LINEUP_EVENT_1) {
                    console.log("equal to half 1")
                    setPlayers(toDictionary(valuesDict["Description"]));
                }
            }
        };

        const toDictionary = (valuesList) => {
            let d = [];
            for (let i = 0; i < valuesList.length; i++) {
                console.log('for key: ', valuesList[i], " we found, ", playersJSON.find(row => Object.keys(row)[0] === valuesList[i]))
                d = [...d, playersJSON.find(row => Object.keys(row)[0] === valuesList[i])]
            }
            return d;
        }

        getStarters();
    }, [open]); // keep dependencies!! --> otherwise this runs after you click button and eareses events :(

    const style = {
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -25%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Button variant="contained" color={props.color} onClick={handleOpen} style={props.buttonStyle}>{props.type}</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <h2 style={{ textAlign: "center", marginTop: 0, marginBottom: 10 }}>{props.description}</h2>
                    <div className="grid" style={{}}>
                        {players.length > 0 && (players.map((player, playerIndex) => (
                            <div key={playerIndex}>
                                {Object.keys(player).map((key, valueIndex) => (
                                    <PlayerCircle class="grid-item" key={valueIndex} playerName={key} playerImage={player[key]} onClickCallback={handlePlayerClick} isSelected={selectedName === key} />
                                ))}
                            </div>
                        )))}
                    </div>
                    <SaveButton buttonClass="lineup" eventName={props.eventName} event={selectedName} onClick={() => handleClose()} />
                </Box>
            </Modal>
        </div>
    )
}

export default GoalModal;

