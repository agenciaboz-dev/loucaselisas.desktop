import React from "react"
import { Box, Typography } from "@mui/material"

interface StatisticsViewProps {
    statistic: number | undefined
    icon: React.ReactNode
    text: string
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({ statistic, icon, text }) => {
    return (
        <Box sx={{ flex: 1, height: "3vw", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ gap: "0.5vw", alignItems: "center" }}>
                <Typography variant="body1" component="p" sx={{ fontSize: "1.1rem" }}>
                    {statistic}
                </Typography>{" "}
                {icon}
            </Box>
            <Typography variant="body1" component="p" sx={{ fontSize: "1.1rem", mt: "-0.3vw" }}>
                {text}
            </Typography>
        </Box>
    )
}
