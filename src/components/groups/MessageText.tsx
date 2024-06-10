import React from "react"
import { Typography } from "@mui/material"
import { Message } from "../../types/server/class/Chat/Message"

interface MessageTextProps {
    deleted: boolean
    message: Message
}

export const MessageText: React.FC<MessageTextProps> = ({ deleted, message }) => {
    return (
        <Typography
            style={{
                wordBreak: "break-word",
                color: deleted ? "#00000060" : "",
                textDecoration: deleted ? "line-through" : "",
                marginLeft: message.media ? "0.3vw" : "",
            }}
        >
            {message.text}
        </Typography>
    )
}
