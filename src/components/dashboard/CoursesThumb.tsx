import React from "react"
import { Avatar, Box, Typography } from "@mui/material"
import { Course } from "../../types/server/class/Course"

interface CoursersThumbProps {
    course: Course
}

export const CoursersThumb: React.FC<CoursersThumbProps> = ({ course }) => {
    const numAulas = course.lessons.length.toString().padStart(2, "0")
    return (
        <Box
            sx={{
                height: "13vw",
                aspectRatio: "4/3",
                flexDirection: "column",
                mr: "0.5vw",
                borderRadius: "1.2vw",
                border: "1px solid red",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Avatar src={course.cover} alt="imagem de capa do curso" variant="square" sx={{ objectFit: "cover", width: 1, height: 1 }} />
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
                }}
            >
                <Typography>{course.name}</Typography>
                <Typography>{numAulas} aulas</Typography>
            </Box>
        </Box>
    )
}
