import {
    createTheme
} from '@mui/material/styles';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    palette: {
        // primary: {
        //     peeYellow: createColor('#FFE694'),
        //     kipYellow: createColor('#FFCD29'),
        // }, secondary: {
        //     blackLikeMySoul: createColor('#000000'),
        //     boringGray: createColor('#757575'),
        //     contrastText: "#fff",
        // }


    },
});

export default theme;