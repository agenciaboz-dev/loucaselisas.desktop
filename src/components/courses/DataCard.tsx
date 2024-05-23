import React from "react"
import { Avatar, Box, Divider, Grid, IconButton, MenuItem, Paper, Typography } from "@mui/material"
import { StatData } from "./StatData"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import ChatIcon from "@mui/icons-material/Chat"
import { useNavigate } from "react-router-dom"
import { Course } from "../../types/server/class/Course"
import { Lesson } from "../../types/server/class/Course/Lesson"
import placeholders from "../../tools/placeholders"
import { slugify } from "../../tools/urlMask"

interface DataCardProps {
    lesson?: Lesson
    course?: Course
    image: string
    title: string
    description: string
    likes: number
    downloads: number
    messages?: number
    views: number
    userName: string | undefined
    link: string
    routerParam?: Course | Lesson | { lesson: Lesson }
}

export const DataCard: React.FC<DataCardProps> = ({
    lesson,
    course,
    image,
    title,
    description,
    likes,
    downloads,
    messages,
    views,
    userName,
    link,
    routerParam,
}) => {
    const navigate = useNavigate()

    return (
        <>
            <Grid item xs={1}>
                <Paper sx={{ flexDirection: "column", position: "relative" }}>
                    <MenuItem sx={{ w: 1, m: 0, p: "0.5vw", gap: "0.5vw" }} onClick={() => navigate(link, { state: { data: routerParam } })}>
                        <Box sx={{ gap: "0.5vw", alignItems: "flex-start", justifyContent: "space-between" }}>
                            <Avatar src={image} variant="rounded" sx={{ width: "5vw", height: "5vw" }}>
                                <Avatar src={placeholders.square} sx={{ width: "3.5vw", height: "3.5vw" }} />
                            </Avatar>
                            <Box sx={{ flexDirection: "column", width: "14.8vw" }}>
                                {/* <MenuItem sx={{ p: 0, m: 0 }} onClick={() => navigate(link, { state: { data: routerParam } })}> */}
                                <Typography
                                    variant="subtitle1"
                                    component="h3"
                                    sx={{
                                        fontSize: "1rem",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {title}
                                </Typography>
                                {/* </MenuItem> */}
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "normal",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                    }}
                                >
                                    {description}
                                </Typography>
                            </Box>
                        </Box>
                    </MenuItem>
                    <IconButton
                        onClick={() => {
                            console.log("clicou em opções")
                        }}
                        sx={{
                            position: "absolute",
                            right: 0,
                            top: "0.5vw",
                            height: "2vw",
                            p: "0.2vw",
                            mr: "0.5vw",
                            minHeight: 0,
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Divider />
                    <Box sx={{ justifyContent: "space-between", p: "0.5vw", gap: "0.5vw" }}>
                        <Box sx={{ gap: "1vw" }}>
                            <StatData stats={likes} Icon={FavoriteBorderIcon} />
                            <StatData stats={downloads} Icon={FileDownloadIcon} />
                            <StatData stats={messages} Icon={ChatIcon} />
                            <StatData stats={views} Icon={VisibilityOutlinedIcon} />
                        </Box>
                        <Typography
                            variant="subtitle1"
                            component="p"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "12.5vw",
                                "&:hover": { textDecoration: "underline", cursor: "pointer" },
                            }}
                            onClick={() => {
                                course && navigate(`/users/${slugify(course?.owner_id)}`)
                                lesson && navigate(`/cursos/${slugify(lesson.course.name)}`, { state: { courseId: lesson.course.id } })
                            }}
                        >
                            @{userName}
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </>
    )
}
