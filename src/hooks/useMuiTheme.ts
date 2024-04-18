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
                contrastText: "#000",
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
            fontFamily: ["FoundersGroteskCondensed"].join(","),
            fontSize: 14,
            h1: {
                fontWeight: 900,
            },
            h2: {
                fontWeight: 700,
            },
            body1: {
                fontWeight: 400,
            },
            subtitle1: {
                fontSize: 500,
            },
        },
    })
    return THEME
}
