import React from "react"
import { Avatar, Box, Paper, Typography } from "@mui/material"
import { Course } from "../../types/server/class/Course"

interface CoursersThumbProps {
    course: Course
}

export const CoursersThumb: React.FC<CoursersThumbProps> = ({ course }) => {
    const numAulas = course.lessons || 9999
    return (
        <Paper
            elevation={2}
            sx={{
                height: "13vw",
                aspectRatio: "4/3",
                flexDirection: "column",
                borderRadius: "1.2vw",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Avatar
                src={course?.cover}
                alt="imagem de capa do curso"
                variant="square"
                sx={{ objectFit: "cover", width: 1, height: 1, pointerEvents: "none" }}
            >
                <Avatar sx={{ width: "8vw", height: "8vw" }} variant="circular" src="./placeholders/midia_1-1.webp" />
            </Avatar>
            <Box
                sx={{
                    flexDirection: "column",
                    position: "absolute",
                    bottom: "1vw",
                    left: "1vw",
                    width: "88%",
                    borderRadius: "0.3vw",
                    justifyContent: "flex-end",
                    padding: "0.2vw 1vw",
                    backgroundColor: "background.paper",
                    userSelect: "none",
                }}
            >
                <Typography variant="body1" component="p" sx={{ fontWeight: "600" }}>
                    {course.name}
                </Typography>
                <Typography variant="body2" component="p" fontSize="0.8rem">
                    {numAulas} Videos
                </Typography>
            </Box>
        </Paper>
    )
}
