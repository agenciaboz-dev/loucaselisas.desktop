import React from "react"
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material"
import { Course } from "../../types/server/class/Course"
import { useNavigate } from "react-router-dom"

interface CoursesListProps {
    course: Course
}

const coverSize = "5vw"

export const CoursesList: React.FC<CoursesListProps> = ({ course }) => {
    const navigate = useNavigate()
    return (
        <Grid item xs={1}>
            <Box
                elevation={3}
                component={Paper}
                sx={{ flex: 1, p: "0.5vw", gap: "1vw", cursor: "pointer" }}
                onClick={() => navigate("/cursos/${course.name}", { state: { data: course } })}
            >
                <Avatar variant="rounded" src={course.cover} alt="Capa do curso" sx={{ width: coverSize, height: coverSize, objectFit: "cover" }}>
                    <Avatar src="./placeholders/midia_1-1.webp" sx={{ width: "3.5vw", height: "3.5vw" }} />
                </Avatar>
                <Box sx={{ justifyContent: "space-between", flexDirection: "column" }}>
                    <Typography variant="subtitle1" component="h3" sx={{ fontSize: "1rem" }}>
                        {course.name}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            width: "29vw",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "normal",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {course.description}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{ fontSize: "0.8rem" }}>
                        {course.lessons || 5999} Videos
                    </Typography>
                </Box>
            </Box>
        </Grid>
    )
}
