import React from "react"
import { Avatar, Box, MenuItem } from "@mui/material"
import { Message } from "../../types/server/class/Chat/Message"
import placeholders from "../../tools/placeholders"

interface MessageImageProps {
    message: Message
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MessageImage: React.FC<MessageImageProps> = ({ message, setIsOpen }) => {
    return (
        <MenuItem sx={{ padding: 0 }}>
            <Avatar
                src={message.media?.url || placeholders.landscape}
                variant="rounded"
                sx={{ width: "15vw", height: "8.43vw", borderRadius: "0.9vw" }}
                onClick={() => setIsOpen(true)}
            >
                <Avatar src={placeholders.landscape} sx={{ width: "15vw", height: "8.43vw", borderRadius: "0.9vw" }} />
            </Avatar>
        </MenuItem>
    )
}
