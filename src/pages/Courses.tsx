import React from "react"
import { Box, Grid, Typography } from "@mui/material"

interface CourrsesProps {}

export const Courses: React.FC<CourrsesProps> = ({}) => {
    return (
        <Box
            sx={{
                overflowY: "scroll",
                flex: 1,
                // flexDirection: "column",
                height: "58vh",
                gap: "0.5vw",
                border: "1px solid blue",
                pt: "0.1vw",
                mx: "-1.5vw",
                px: "1.5vw",
            }}
        >
            <Typography variant="h1" sx={{ textDecoration: "underline" }}>
                teste
            </Typography>
            <Typography variant="h1">teste</Typography>
            {/* <Grid container columns={3} spacing={2}>
            </Grid> */}
        </Box>
    )
}
