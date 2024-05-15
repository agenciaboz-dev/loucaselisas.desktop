import React from "react"
import { Box, SxProps, Typography } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"

interface NoFeaturedContentProps {
    title: string
    text: string
    styles?: SxProps
}

export const NoFeaturedContent: React.FC<NoFeaturedContentProps> = ({ title, text, styles }) => {
    return (
        // {filteredCourses.length === 0 && (
        <Box
            sx={{
                ...styles,
                margin: "0.1vw 0",
                width: 1,
                backgroundColor: "#dddddd",
                borderRadius: "1.2vw",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
                userSelect: "none",
                touchAction: "none",
                gap: "1vw",
            }}
        >
            <Box>
                <ErrorOutlineIcon sx={{ fontSize: "72px" }} />
            </Box>
            <Box sx={{ flexDirection: "column" }}>
                <Typography variant="h5" component="p">
                    {title}
                </Typography>
                <Typography variant="body1" component="p">
                    {text}
                </Typography>
            </Box>
        </Box>
        // )}
    )
}
