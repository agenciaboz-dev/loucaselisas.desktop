import { createTheme } from "@mui/material"
import { grey, red } from "@mui/material/colors"

export const usemuiTheme = () => {
    const THEME = createTheme({
        palette: {
            primary: {
                main: "#000",
                contrastText: "#fff",
            },
            secondary: {
                main: "#DDDDDD",
                contrastText: "#7F7F7F",
            },
            error: {
                main: red[900],
            },
            background: {
                default: "#DDDDDD",
                paper: grey[100],
            },
        },
        typography: {
            fontFamily: ["FoundersGrotesk", "sans-serif"].join(","),
            fontSize: 16,

            h1: {
                fontFamily: "FoundersGroteskCondensed",
                fontWeight: 300,
                fontSize: "1.8rem",
            },
            h2: {
                fontFamily: "FoundersGroteskCondensed",
                fontWeight: 300,
                fontSize: "1.5rem",
            },
            h3: {
                fontFamily: "FoundersGroteskXCondensed",
                fontWeight: 700,
                fontSize: "1.3rem",
            },
            h4: {
                fontFamily: "FoundersGroteskXCondensed",
                fontWeight: 300,
                fontSize: "1.1rem",
            },
            subtitle1: {
                fontFamily: "FoundersGrotesk",
                fontWeight: 700,
                fontSize: "1rem",
            },
            body1: {
                fontFamily: "FoundersGrotesk",
                fontWeight: 400,
                fontSize: "0.9rem",
            },
            body2: {
                fontFamily: "FoundersGrotesk",
                fontWeight: 400,
            },
        },
    })
    return THEME
}

//titulo login bold 5.2rem
//titulo principal h1 xcondensed lt 1.8rem
//menu item h2 condensed lt - 1.5rem
//username h3 xcondensed bold - 1.3rem 
//função h4 xcondensed - 1.1 rem
//subtitle bold - 1rem
//body 1 regular - 0.9 rem
//body 2 regular - variavel