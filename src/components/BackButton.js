import { React } from 'react';
import Button from '@mui/material/Button';

const BackButton = ({ onClick }) => {
    const handleClick = () => {
        onClick();
    }
    return (
        <Button variant="outlined" color="error" style={{ width: "50px", position: "absolute", left: "0", top: "0", marginLeft: "20px", marginTop: "10px" }} onClick={handleClick}>
            Back
        </Button >
    )
}

export default BackButton;