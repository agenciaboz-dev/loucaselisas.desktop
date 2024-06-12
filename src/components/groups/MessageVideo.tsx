import React from "react"
import { Avatar, Box, MenuItem, Paper, Typography } from "@mui/material"
import { Message } from "../../types/server/class/Chat/Message"
import placeholders from "../../tools/placeholders"
import { Lesson } from "../../types/server/class/Course/Lesson"
import moment from "moment"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { useNavigate } from "react-router-dom"
import { slugify } from "../../tools/urlMask"
import { useTimeInstant } from "../../hooks/useTimeInstant"
dayjs.extend(duration)

interface MessageVideoProps {
    message: Message
    lesson: Lesson
}

export const MessageVideo: React.FC<MessageVideoProps> = ({ message, lesson }) => {
    const navigate = useNavigate()
    const { setTimeInstant } = useTimeInstant()
    const link = `/licoes/${slugify(lesson.name)}?id:${lesson.id}`
    const routerParam = { lesson }
    const formattedDuration = dayjs.duration(Number(message.video_timestamp)).format("mm:ss")

    return (
        <Box sx={{ gap: "1vw", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Box sx={{ gap: "1vw" }}>
                <MenuItem
                    sx={{ padding: 0, gap: "1vw" }}
                    onClick={() => {
                        setTimeInstant(Number(message.video_timestamp) / 1000)
                        navigate(link, { state: { data: routerParam } })
                    }}
                >
                    <Avatar
                        src={lesson.thumb || placeholders.video}
                        sx={{
                            borderRadius: "0.5vw",
                            width: "3.75vw",
                            height: "3.75vw",
                        }}
                    >
                        <Avatar
                            src={placeholders.video}
                            sx={{
                                borderRadius: "0.5vw",
                                width: "3.75vw",
                                height: "3.75vw",
                            }}
                        />
                    </Avatar>
                    <Box sx={{ flexDirection: "column" }}>
                        <Typography variant="body1" component="p" sx={{ maxWidth: "24vw", fontWeight: 700 }}>
                            {lesson.name}
                        </Typography>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                maxWidth: "24vw",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "normal",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {lesson.info}
                        </Typography>
                    </Box>
                </MenuItem>
            </Box>
            <Typography>{formattedDuration}</Typography>
        </Box>
    )
}
