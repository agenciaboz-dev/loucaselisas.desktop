import React from "react"
import { Avatar, Box, Divider, IconButton, Paper, SxProps, Typography } from "@mui/material"
import { Message } from "../../types/server/class/Chat/Message"
import { User } from "../../types/server/class"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Course } from "../../types/server/class/Course"

interface MessageCardProps {
    message: Message
    course: Course
    sx?: SxProps
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, course, sx }) => {
    const textCard = { maxWidth: "20.8vw", maxHeight: "3vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }

    return (
        <Paper sx={{ padding: "0.5vw", gap: "0.5vw", flexDirection: "column", ...sx }}>
            <Box sx={{ gap: "0.5vw" }}>
                <Box sx={{ flexDirection: "column" }}>
                    <Typography sx={textCard}>{course.name}</Typography>
                    <Typography sx={textCard}>{course.description}</Typography>
                </Box>
                <Box>
                    <Avatar src={course.cover} variant="rounded" sx={{ width: "2.5vw", height: "2.5vw" }}></Avatar>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ justifyContent: "space-between" }}>
                <Box sx={{ flexDirection: "column" }}>
                    <Typography>Mensagem:</Typography>
                    <Typography
                        sx={{
                            maxWidth: "20.8vw",
                            maxHeight: "5vw",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "normal",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 4,
                        }}
                    >
                        {message.text}
                    </Typography>
                </Box>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Box>
        </Paper>
    )
}
