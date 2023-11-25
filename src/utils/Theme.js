import {
    createTheme
} from '@mui/material/styles';
import "../App.css"

// const { palette } = createTheme();
// const { augmentColor } = palette;
// const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 13,
                    marginBottom: "20px"
                },
            },
        },
    },
    typography: {
        fontFamily: "'Nunito', sans-serif",
        button: {
            textTransform: "none"
        }
    },
    palette: {
        primary: {
            main: '#FFCD29', // kipYellow
        },
        secondary: {
            main: '#FFE694' // peeYellow
        },
        accent: {
            main: '#000000', // black
            light: '#757575', // gray
            contrastText: "#fff", // white
        }
    },
});

export default theme;