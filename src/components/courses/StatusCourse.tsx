import React from "react"
import { Avatar, Box, Button, Divider, Grid, IconButton, Paper, Typography } from "@mui/material"
import { Course } from "../../types/server/class/Course"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { StatData } from "./StatData"

interface StatusCourseProps {
    course: Course
}

export const StatusCourse: React.FC<StatusCourseProps> = ({ course }) => {
    const userName = course.owner.user.username
    const downloadsNumber = course.downloads

    return (
        <>
            <Grid item xs={1}>
                <Paper sx={{ flexDirection: "column", p: "0.5vw", gap: "0.5vw" }}>
                    <Box sx={{ gap: "0.5vw", alignItems: "flex-start", justifyContent: "space-between" }}>
                        <Avatar src={course.cover} variant="rounded" sx={{ width: "5vw", height: "5vw" }} />
                        <Box sx={{ flexDirection: "column", width: "14.8vw" }}>
                            <Typography variant="subtitle1" component="h3" sx={{ fontSize: "1rem" }}>
                                {course.name}
                            </Typography>
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
                                {course.description}
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
                            <StatData stats={course.likes} Icon={FavoriteBorderIcon} />
                            <StatData stats={downloadsNumber} Icon={FavoriteBorderIcon} />
                            <StatData stats={course.chat?.messages} Icon={FavoriteBorderIcon} />
                            <StatData stats={course.views} Icon={FavoriteBorderIcon} />
                        </Box>

                        <Typography variant="subtitle1" component="p">
                            @{userName}
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </>
    )
}
