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
    const [selectedPLayersS2, setSelectedPlayersS2] = useState([]); // list of names
    const [selectedPLayersS1, setSelectedPlayersS1] = useState([]);
    // const [players, setPlayers] = useState({})
    const [playersScreen2, setPlayersScreen2] = useState({})
    const [playersScreen1, setPlayersScreen1] = useState({})
    const emptyText = "No players selected in lineup."

    // const checkIfIncluded = (player) => {
    //     if (showModal2) {
    //         if (props.type === process.env.REACT_APP_GOAL_TYPE) {
    //             return selectedPLayersS2 === player;
    //         } else if (props.type === process.env.REACT_APP_SUB_TYPE) {
    //             return selectedPLayersS2.includes(player);
    //         }
    //     } else {
    //         if (props.type === process.env.REACT_APP_GOAL_TYPE) {
    //             return selectedPLayersS1 === player;
    //         } else if (props.type === process.env.REACT_APP_SUB_TYPE) {
    //             return selectedPLayersS1.includes(player);
    //         }
    //     }
    //     // showModal2 ? selectedPLayersS2.includes(player[0]) : selectedPLayersS1.includes(player[0])
    // }
    const handleScreen2Click = (playerName) => {
        if (props.type === process.env.REACT_APP_GOAL_TYPE) {
            setSelectedPlayersS2([playerName])
        } else if (props.type === process.env.REACT_APP_SUB_TYPE) {
            const playerIdx = selectedPLayersS2.indexOf(playerName);

            if (playerIdx !== -1) {
                // if in array, remove
                const updatedNames = [...selectedPLayersS2];
                updatedNames.splice(playerIdx, 1);
                setSelectedPlayersS2(updatedNames);
            } else {
                // if not in array, add
                setSelectedPlayersS2([...selectedPLayersS2, playerName]);
            }
        }
    }

    const handleScreen1Click = (playerName) => {
        if (props.type === process.env.REACT_APP_GOAL_TYPE) {
            setSelectedPlayersS1([playerName])
        } else if (props.type === process.env.REACT_APP_SUB_TYPE) {
            const playerIdx = selectedPLayersS1.indexOf(playerName);

            if (playerIdx !== -1) {
                // if in array, remove
                const updatedNames = [...selectedPLayersS1];
                updatedNames.splice(playerIdx, 1);
                setSelectedPlayersS1(updatedNames);
            } else {
                // if not in array, add
                setSelectedPlayersS1([...selectedPLayersS1, playerName])
            }
        }

    }

    const handleForwardClick = () => {
        setShowModal2(true);
    }

    const handleBackClick = () => {
        setShowModal2(false);
    }


    useEffect(() => {
        if (saveClicked && props.type === process.env.REACT_APP_SUB_TYPE) {
            if (selectedPLayersS2.length !== selectedPLayersS1.length) {
                console.log("blud you need to select the same number of people for each")
            } else {
                for (let i = 0; i < selectedPLayersS1.length; i++) {
                    playersOnField.swapPlayers(selectedPLayersS2[i], selectedPLayersS1[i]);
                }
            }
        }
        setShowModal2(false);
        // need the below line to remove warning about dependency array
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveClicked])

    useEffect(() => {
        const getStarters = () => {
            if (props.type === process.env.REACT_APP_SUB_TYPE) {
                setPlayersScreen1(playersOnField.getBenchPlayers());
                setPlayersScreen2(playersOnField.get());
            } else {
                setPlayersScreen1(playersOnField.get());
                setPlayersScreen2(playersOnField.get());
            }
        };

        if (open) {
            // need to reset all of these so the next time that it opens everything works
            getStarters();
            setSelectedPlayersS2([]);
            setSelectedPlayersS1([]);
            setSaveClicked(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

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
                    <div className={(Object.keys(playersScreen2).length > 0) ? "grid" : ""} style={{}}>
                        <>
                            {!showModal2 && Object.keys(playersScreen2).length > 0 &&
                                <Button variant="contained" color="success" style={{ width: "150px", position: "absolute", right: "0", bottom: "0", marginRight: "20px", marginBottom: "10px" }} onClick={handleForwardClick}>Next</Button>
                            }
                            {Object.keys(playersScreen2).length > 0 ? (Object.entries(showModal2 ? playersScreen2 : playersScreen1).map((player, playerIndex) => ( // note: players = [key, value]
                                <div key={playerIndex}>
                                    <PlayerCircle class="grid-item" key={playerIndex} playerName={player[0]} playerImage={player[1]} onClickCallback={showModal2 ? handleScreen2Click : handleScreen1Click} isSelected={showModal2 ? selectedPLayersS2.includes(player[0]) : selectedPLayersS1.includes(player[0])} />
                                </div>
                            ))) : <p style={{
                                width: "100%", display: "flex", justifyContent: "center", alignItems: "center"
                            }}>{emptyText}</p>}
                        </>
                    </div>
                    {showModal2 &&
                        <>
                            <SaveButton buttonClass="lineup" eventName={props.eventName} eventName2={props.eventName2} event={selectedPLayersS1} event2={selectedPLayersS2} onClick={() => {
                                if (selectedPLayersS2.length === selectedPLayersS1.length) {
                                    setSaveClicked(true);
                                    handleClose();
                                } else {
                                    console.log("not saving because not equal selected")
                                }
                            }} condition={selectedPLayersS2.length === selectedPLayersS1.length} />
                            <BackButton onClick={() => handleBackClick()} />
                        </>
                    }
                </Box>
            </Modal>
        </div >
    )
}

export default DoubleModal;

