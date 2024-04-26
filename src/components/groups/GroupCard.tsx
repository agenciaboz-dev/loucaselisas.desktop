import React, { useEffect, useState } from "react"
import { Avatar, Box, Divider, Grid, Menu, MenuItem, Paper, Typography } from "@mui/material"
import MoreVert from "@mui/icons-material/MoreVert"
import { Course } from "../../types/server/class/Course"
import { Message } from "../../types/server/class/Chat/Message"
import { api } from "../../api/api"

interface GroupCardProps {
    course: Course
}

export const GroupCard: React.FC<GroupCardProps> = ({ course }) => {
    const max_text_width = "16vw"

    const chat = course.chat

    const [message, setMessage] = useState<Message | null>(null)

    const getMessage = async () => {
        try {
            const response = await api.get("/course/last_message", { params: { course_id: course.id } })
            setMessage(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMessage()
    }, [course])

    return (
        message && (
            <Grid item xs={1} sx={{}}>
                <Paper sx={{ flexDirection: "column", p: "0.7vw", gap: "0.5vw", borderRadius: "0.5vw", flex: 1 }}>
                    <Box sx={{ width: 1, flexDirection: "row", justifyContent: "space-between" }}>
                        <Box sx={{ flexDirection: "column", justifyContent: "center" }}>
                            <Typography
                                variant="body2"
                                component={"p"}
                                sx={{
                                    maxWidth: max_text_width,
                                    fontWeight: "bold",
                                    textOverflow: "ellipsis",
                                    overflowX: "hidden",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {course.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                component={"p"}
                                fontSize={"0.8rem"}
                                sx={{
                                    maxWidth: max_text_width,
                                    textOverflow: "ellipsis",
                                    overflowX: "hidden",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {course.description}
                            </Typography>
                        </Box>
                        <Avatar src={course.cover} variant="rounded" sx={{ width: "3vw", height: "3vw" }} />
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            width: 1,
                            flexDirection: "row",
                            gap: "0.5vw",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                width: 0.8,
                                flexDirection: "row",
                                alignItems: "center",
                                minHeight: "4.2vw",
                                gap: "0.5vw",
                            }}
                        >
                            <Avatar src={message.user.cover} variant="circular" sx={{ width: "3vw", height: "3vw" }} />
                            <Box sx={{ width: 0.75, flexDirection: "column", gap: "0.2vw" }}>
                                <Typography variant="body2" component={"p"}>
                                    {message?.user.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    component={"p"}
                                    fontSize={"0.8rem"}
                                    sx={{
                                        width: 1,
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        textAlign: "justify",
                                    }}
                                >
                                    {message?.text}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flexDirection: "column", alignItems: "end" }}>
                            <Typography variant="body2" component={"p"} fontSize={"0.75rem"} sx={{ color: "gray" }}>
                                {new Date(Number(message?.datetime)).toLocaleDateString("pt-br")}
                            </Typography>
                            <Typography variant="body2" component={"p"} fontSize={"0.75rem"} sx={{ color: "gray" }}>
                                {new Date(Number(message.datetime)).toLocaleTimeString("pt-br", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        )
    )
}
