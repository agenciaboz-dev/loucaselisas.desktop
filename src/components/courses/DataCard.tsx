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

interface DataCardProps {
    image: string
    title: string
    description: string
    likes: number
    downloads: number
    messages?: number
    views: number
    userName: string | undefined
    link: string
    routerParam?: Course | Lesson
}

export const DataCard: React.FC<DataCardProps> = ({ image, title, description, likes, downloads, messages, views, userName, link, routerParam }) => {
    const navigate = useNavigate()

    return (
        <>
            <Grid item xs={1}>
                <Paper sx={{ flexDirection: "column", p: "0.5vw", gap: "0.5vw" }}>
                    <Box sx={{ gap: "0.5vw", alignItems: "flex-start", justifyContent: "space-between" }}>
                        <Avatar src={image} variant="rounded" sx={{ width: "5vw", height: "5vw" }} />
                        <Box sx={{ flexDirection: "column", width: "14.8vw" }}>
                            <MenuItem sx={{ p: 0, m: 0 }} onClick={() => navigate(link, { state: { data: routerParam } })}>
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
                            </MenuItem>
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
                        <Box>
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ justifyContent: "space-between" }}>
                        <Box sx={{ gap: "1vw" }}>
                            <StatData stats={likes} Icon={FavoriteBorderIcon} />
                            <StatData stats={downloads} Icon={FileDownloadIcon} />
                            <StatData stats={messages} Icon={ChatIcon} />
                            <StatData stats={views} Icon={VisibilityOutlinedIcon} />
                        </Box>
                        <Typography
                            variant="subtitle1"
                            component="p"
                            sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "12.5vw" }}
                        >
                            @{userName}
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </>
    )
}
