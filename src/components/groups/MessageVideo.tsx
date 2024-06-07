import React from "react"
import { Avatar, Box, Typography } from "@mui/material"
import { Message } from "../../types/server/class/Chat/Message"
import placeholders from "../../tools/placeholders"
import { Lesson } from "../../types/server/class/Course/Lesson"
import moment from "moment"
import "moment-duration-format"

interface MessageVideoProps {
    message: Message
    lesson: Lesson
}

export const MessageVideo: React.FC<MessageVideoProps> = ({ message, lesson }) => {
    return (
        <Box sx={{ gap: "1vw" }}>
            <Avatar
                src={lesson.media.url || placeholders.video}
                sx={{
                    borderRadius: "0.5vw",
                    width: "3vw",
                    height: "3vw",
                }}
            >
                <Avatar src={placeholders.video} />
            </Avatar>
            <Box sx={{ flexDirection: "column" }}>
                <Typography sx={{ maxWidth: "15vw" }}>{lesson.name}</Typography>
                <Typography sx={{ maxWidth: "15vw" }}>{lesson.info}</Typography>
            </Box>
            <Typography>
                {/* @ts-ignore */}
                {moment.duration(message.video_timestamp).format("mm:ss", { trim: false })}
            </Typography>
        </Box>
    )
}
