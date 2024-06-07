import React from "react"
import { Avatar, Box, Typography } from "@mui/material"

interface MessageVideoProps {}

export const MessageVideo: React.FC<MessageVideoProps> = ({}) => {
    return (
        <Box>
            <Avatar
                src={"/placeholders/video.webp"}
                sx={{
                    borderRadius: "0.5vw",
                    width: "3vw",
                    height: "3vw",
                }}
            />
            <Box></Box>
            <Typography></Typography>
        </Box>
    )
}
