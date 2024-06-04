import React, { useEffect, useState } from "react"
import { Avatar, Box, Divider, Grid, Menu, MenuItem, Paper, Typography } from "@mui/material"
import MoreVert from "@mui/icons-material/MoreVert"
import { Course } from "../../types/server/class/Course"
import { Message } from "../../types/server/class/Chat/Message"
import { api } from "../../api/api"
import placeholders from "../../tools/placeholders"
import { useNavigate } from "react-router-dom"

interface GroupCardProps {
    course: Course
    setExpanded: React.Dispatch<React.SetStateAction<Boolean>>
    expandedChat: Boolean
    setCourse: React.Dispatch<React.SetStateAction<Course | null>>
    setCourseId: React.Dispatch<React.SetStateAction<string>>
}

export const GroupCard: React.FC<GroupCardProps> = ({ course, setExpanded, setCourse, setCourseId }) => {
    const max_text_width = "16vw"
    const navigate = useNavigate()
    const [message, setMessage] = useState<Message | null>(null)
    const [hover, setHover] = useState(false)
    const chat = course.chat

    const defaultStyle = {
        flexDirection: "column",
        p: "0.7vw",
        gap: "0.5vw",
        borderRadius: "0.5vw",
        flex: 1,
        cursor: "pointer",
    }

    const hoverStyle = {
        ...defaultStyle,
        backgroundColor: "#E5E5E5", // Exemplo de cor quando o mouse está sobre o componente
    }

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
                <Paper
                    sx={hover ? hoverStyle : defaultStyle}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => {
                        setExpanded(true)
                        setCourse(course)
                        // setCourseId(course.id)
                        navigate(`/grupos?id=${course.id}`)
                    }}
                >
                    <Box sx={{ width: 1, flexDirection: "row", justifyContent: "space-between", gap: "0.5vw" }}>
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
                        <Avatar src={course.cover || placeholders.square} variant="rounded" sx={{ width: "3vw", height: "3vw" }} />
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
                                flexDirection: "row",
                                alignItems: "center",
                                minHeight: "4.2vw",
                                gap: "0.5vw",
                            }}
                        >
                            <Avatar src={message.user?.cover || placeholders.avatar} variant="circular" sx={{ width: "3vw", height: "3vw" }} />
                            <Box sx={{ width: 0.75, flexDirection: "column", gap: "0.2vw" }}>
                                <Typography
                                    variant="body2"
                                    component={"p"}
                                    sx={{ width: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                >
                                    {message?.user?.name || "Usuário indisponivel"}
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
