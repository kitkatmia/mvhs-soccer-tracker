import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PlayerCircle from './PlayerCircle';
import players from "../data/players.json";
import SaveButton from './SaveButton';
import "./LineUp.css";
import playersOnField from '../contexts/GlobalCurrentPlayers';
import playersJSON from "../data/players.json"

const LineUp = (props) => {
    // DEBUG: add maxium of 11 players selected
    const [saveClicked, setSaveClicked] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    };

    const [selectedNames, setSelectedNames] = useState([]);

    useEffect(() => {
        if (saveClicked) {
            const toDictionary = (valuesList) => {
                console.log("values list: ", valuesList)
                let d = [];
                for (let i = 0; i < valuesList.length; i++) {
                    d = [...d, playersJSON.find(row => Object.keys(row)[0] === valuesList[i])]
                }
                return d;
            }
            playersOnField.setAll(toDictionary(selectedNames));
        }
    }, [saveClicked, selectedNames])

    const handlePlayerClick = (playerName) => {
        const playerIdx = selectedNames.indexOf(playerName);

        if (playerIdx !== -1) {
            // if in array, remove
            const updatedNames = [...selectedNames];
            updatedNames.splice(playerIdx, 1);
            setSelectedNames(updatedNames);
        } else {
            // if not in array, add
            setSelectedNames([...selectedNames, playerName]);
        }
    }

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
                        {players.map((player, playerIndex) => (
                            <div key={playerIndex}>
                                {Object.keys(player).map((key, valueIndex) => (
                                    <PlayerCircle class="grid-item" key={valueIndex} playerName={key} playerImage={player[key]} onClickCallback={handlePlayerClick} />
                                ))}
                            </div>
                        ))}
                    </div>
                    <SaveButton buttonClass="lineup" eventName={props.eventName} event={selectedNames} onClick={() => { setSaveClicked(true); handleClose(); }} />
                </Box>
            </Modal>
        </div>
    )
}

export default LineUp;
