import { React } from 'react';
import customTheme from '../utils/Theme.js'

const PlayerCircle = ({ playerName, playerImage, onClickCallback, isSelected = false }) => {
    // is selected was default true
    // const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        // setIsClicked(!isClicked);
        onClickCallback(playerName);
    };

    const buttonStyle = {
        borderRadius: "50%",
        width: 40,
        height: 40,
        marginTop: 5,
        padding: "3px",
        border: isSelected ? `5px solid ${customTheme.palette.primary.main}` : "5px solid transparent",
    };

    const imgUrl = process.env.PUBLIC_URL + '/images/' + playerImage;
    return (
        <div
            style={{ verticalAlign: "top", display: "inline-block", textAlign: "center", marginBottom: 30 }}
        >
            <img src={imgUrl} alt={playerName} style={buttonStyle} onClick={handleClick} />
            <div style={{}}>
                {playerName}
            </div>
        </div >
    )
}

export default PlayerCircle;
