import React from "react"
import { Box, Typography } from "@mui/material"

interface StatisticsViewProps {
    statistic: number
    icon: React.ReactNode
    text: string
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({ statistic, icon, text }) => {
    return (
        <Box sx={{ flex: 1, border: "1px solid red", height: "3vw", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ gap: "0.5vw" }}>
                <Typography>{statistic}</Typography> {icon}
            </Box>
            <Typography>{text}</Typography>
        </Box>
    )
}
