import React from "react"
import { Avatar, Box } from "@mui/material"
import { Message } from "../../types/server/class/Chat/Message"

interface MessageImageProps {
    message: Message
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MessageImage: React.FC<MessageImageProps> = ({ message, setIsOpen }) => {
    return (
        <Box>
            <Avatar
                src={message.media?.url}
                variant="rounded"
                sx={{ width: "15vw", height: "8.43vw", borderRadius: "0.9vw" }}
                onClick={() => setIsOpen(true)}
            />
        </Box>
    )
}
