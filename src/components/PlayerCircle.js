import { React, useState } from 'react';

const PlayerCircle = ({ playerName, playerImage, onClickCallback }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        onClickCallback(playerName);
    };

    const buttonStyle = {
        borderRadius: "50%",
        width: 50,
        height: 50,
        marginTop: 15,
        padding: "3px",
        border: isClicked ? "5px solid red" : "5px solid transparent",
    };

    const imgUrl = process.env.PUBLIC_URL + '/images/' + playerImage;
    return (
        <div
            style={{ verticalAlign: "top", display: "inline-block", textAlign: "center" }}
        >
            <img src={imgUrl} alt={playerName} style={buttonStyle} onClick={handleClick} />
            <div style={{ marginBottom: 40 }}>
                {playerName}
            </div>
        </div >
    )
}

export default PlayerCircle;
