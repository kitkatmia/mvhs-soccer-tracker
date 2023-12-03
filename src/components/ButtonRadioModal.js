import { React, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SaveButton from './SaveButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const ButtonRadioModal = (props) => {
    // const [saveClicked, setSaveClicked] = useState(false);
    const [eventVal, setEventVal] = useState("Goal")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    };

    const style = {
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -25%)',
        width: 650,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // const [value, setEventVal] = React.useState('female');

    const handleChange = (event) => {
        setEventVal(event.target.value);
        console.log("val is: ", eventVal)
    };


    // useEffect(() => {
    //     if (saveClicked) {

    //     }
    // }, [saveClicked, selectedNames])

    return (
        <div>
            <Button variant="contained" color={props.color} onClick={handleOpen} style={props.buttonStyle}>{props.type}</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <h2 style={{ textAlign: "center", marginTop: 0, marginBottom: 10 }}>{props.description}</h2>
                    <FormControl>
                        {/* <FormLabel id="demo-radio-buttons-group-label">Event</FormLabel> */}
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={eventVal}
                            onChange={handleChange}
                        >
                            <FormControlLabel value={process.env.REACT_APP_OPP_GOAL} control={<Radio />} label={process.env.REACT_APP_OPP_GOAL} />
                            <FormControlLabel value={process.env.REACT_APP_OPP_FOULS} control={<Radio />} label={process.env.REACT_APP_OPP_FOULS} />
                            <FormControlLabel value={process.env.REACT_APP_OPP_OFFSIDE} control={<Radio />} label={process.env.REACT_APP_OPP_OFFSIDE} />
                        </RadioGroup>
                    </FormControl>
                    <SaveButton eventName={eventVal} event={null} onClick={() => { handleClose() }} />
                </Box>
            </Modal>
        </div>
    )
}

export default ButtonRadioModal;

