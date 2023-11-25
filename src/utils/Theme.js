import {
    createTheme
} from '@mui/material/styles';
import "../App.css"

// const { palette } = createTheme();
// const { augmentColor } = palette;
// const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    typography: {
        fontFamily: "'Nunito', sans-serif",
        button: {
            textTransform: "none"
        }
    },
    palette: {
        primary: {
            main: '#FFCD29', // kipYellow
            light: '#FFE694' // peeYellow
        }, secondary: {
            main: '#000000', // black
            light: '#757575', // gray
            contrastText: "#fff", // white
        }
    },
});

export default theme;