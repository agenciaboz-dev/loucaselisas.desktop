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
                color: deleted ? "#00000060" : "",
                wordBreak: "break-word",
                textDecoration: deleted ? "line-through" : "",
                marginLeft: message.media ? "0.3vw" : "",
            }}
        >
            {message.text}
        </Typography>
    )
}
