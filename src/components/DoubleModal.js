import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PlayerCircle from './PlayerCircle';
import SaveButton from './SaveButton';
import BackButton from './BackButton';
import playersOnField from '../contexts/GlobalCurrentPlayers';

const DoubleModal = (props) => {
    const [saveClicked, setSaveClicked] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showModal2, setShowModal2] = useState(false);
    const [screen2Player, setScreen2Player] = useState("");
    const [screen1Player, setScreen1Player] = useState("");
    // const [players, setPlayers] = useState({})
    const [playersScreen2, setPlayersScreen2] = useState({})
    const [playersScreen1, setPlayersScreen1] = useState({})
    const emptyText = "No players selected in lineup."

    const handleScreen2Click = (playerName) => {
        // DEBUG: high-key buggy --> sometimes on de-select, can't reselect some profiles until many clicks (not sure why, most likely interplay between isSelected and isClicked field)
        // DEBUG: conssirnley takes 2 clicks to hgihlight name clicked
        setScreen2Player(playerName);
    }

    const handleScreen1Click = (playerName) => {
        setScreen1Player(playerName)
        setShowModal2(true);
    }

    const handleBackClick = () => {
        setShowModal2(false);
    }

    useEffect(() => {
        if (saveClicked && props.type === process.env.REACT_APP_SUB_TYPE) {
            playersOnField.swapPlayers(screen2Player, screen1Player);
        }
        setShowModal2(false);
    }, [saveClicked, playersScreen1, playersScreen2])

    useEffect(() => {
        const getStarters = () => {
            if (props.type === process.env.REACT_APP_SUB_TYPE) {
                setPlayersScreen1(playersOnField.getBenchPlayers());
                setPlayersScreen2(playersOnField.get());
            } else {
                setPlayersScreen1(playersOnField.get());
                setPlayersScreen2(playersScreen1)
            }
            // DEBUG: revert doesn't work with this (adds previous and new names... although previous names shouldn't be in local storage) --> solution may be related to using useEffect or useSyncExternalStore
            // for (let i = 0; i < localStorage.length; i++) {
            //     const key = localStorage.key(i);
            //     console.log('key: ', key, " val: ", JSON.parse(localStorage.getItem(key)))
            //     const valuesDict = JSON.parse(localStorage.getItem(key)) || {}
            //     if (valuesDict["Event"] === process.env.REACT_APP_LINEUP_EVENT_2) {
            //         console.log("equal to half 2, ", toDictionary(valuesDict["Description"]))
            //         setPlayers(toDictionary(valuesDict["Description"]));
            //         return;
            //     } else if (valuesDict["Event"] === process.env.REACT_APP_LINEUP_EVENT_1) {
            //         console.log("equal to half 1")
            //         setPlayers(toDictionary(valuesDict["Description"]));
            //     } else {
            //         setPlayers({});
            //     }
            // }
        };

        getStarters();
    }, [open]); // DEBUG: not sure that I need dependencies

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
                    <h2 style={{ textAlign: "center", marginTop: 0, marginBottom: 10 }}>{showModal2 ? props.descriptionPanel2 : props.descriptionPanel1}</h2>
                    {/* players */}
                    <div className={playersScreen1.length > 0 ? "grid" : ""} style={{}}>
                        {playersScreen1.length > 0 ? ((showModal2 ? playersScreen2 : playersScreen1).map((player, playerIndex) => (
                            <div key={playerIndex}>
                                {Object.keys(player).map((key, valueIndex) => (
                                    <PlayerCircle class="grid-item" key={valueIndex} playerName={key} playerImage={player[key]} onClickCallback={showModal2 ? handleScreen2Click : handleScreen1Click} isSelected={screen2Player === key} />
                                ))}
                            </div>
                        ))) : <p style={{
                            width: "100%", display: "flex", justifyContent: "center", alignItems: "center"
                        }}>{emptyText}</p>}
                    </div>
                    {showModal2 &&
                        <>
                            <SaveButton buttonClass="lineup" eventName={props.eventName} eventName2={props.eventName2} event={screen1Player} event2={screen2Player} onClick={() => { setSaveClicked(true); handleClose(); }} />
                            <BackButton onClick={() => handleBackClick()} />
                        </>
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default DoubleModal;

