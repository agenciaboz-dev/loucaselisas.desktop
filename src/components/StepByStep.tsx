import React from "react"
import { Box, Typography } from "@mui/material"

interface StepByStepProps {
    title: string
    text: string
}

export const StepByStep: React.FC<StepByStepProps> = ({ text, title }) => {
    return (
        <Box sx={{ gap: "0.3vw" }}>
            <Typography variant="h2" component="h3" sx={{ fontWeight: 700, fontSize: "1.3rem" }}>
                {title}
            </Typography>
            <Typography variant="h2" component="p" sx={{ fontSize: "1.2rem" }}>
                {text}
            </Typography>
        </Box>
    )
}
