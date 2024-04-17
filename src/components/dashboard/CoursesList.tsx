import React from "react"
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material"
import { Course } from "../../types/server/class/Course"

interface CoursesListProps {
    course: Course
}

const coverSize = "5vw"

export const CoursesList: React.FC<CoursesListProps> = ({ course }) => {
    return (
        <Grid item xs={1}>
            <Box elevation={3} component={Paper} sx={{ flex: 1, p: "0.5vw", gap: "1vw" }}>
                <Avatar variant="rounded" src={course.cover} alt="Capa do curso" sx={{ width: coverSize, height: coverSize, objectFit: "cover" }}>
                    <Avatar src="./placeholders/midia_1-1.webp" sx={{ width: "3.5vw", height: "3.5vw" }} />
                </Avatar>
                <Box sx={{ justifyContent: "space-between", flexDirection: "column" }}>
                    <Typography variant="h2" component="h3" sx={{ fontSize: "1rem" }}>
                        {course.name}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            width: "30vw",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "normal",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            fontSize: "0.9rem",
                        }}
                    >
                        {course.description}
                    </Typography>
                    <Typography>{course.lessons?.length || 5999} aulas</Typography>
                </Box>
            </Box>
        </Grid>
    )
}
