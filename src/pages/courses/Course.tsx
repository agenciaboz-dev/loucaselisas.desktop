import React, { useEffect, useState } from "react"
import { Avatar, Box, Grid } from "@mui/material"
import { useLocation } from "react-router-dom"
import { Course } from "../../types/server/class/Course"
import { api } from "../../api/api"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { HeaderInfo } from "../../components/header/HeaderInfo"

interface CourseProps {}

export const CoursePage: React.FC<CourseProps> = ({}) => {
    const course = useLocation().state.data as Course
    // const isVideo = course.cover_type === "video"

    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<Lesson[]>([])

    const fetchLessons = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/lesson/course", { params: { course_id: course.id } })
            setLessons(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLessons()
    }, [])

    return (
        <Box sx={{ flexDirection: "column" }}>
            <HeaderInfo title={`Curso: ${course.name}`} refreshButton={false} exitButton={false} backButton />
            <Grid container columns={2} spacing={4} sx={{ width: "75vw", height: "auto" }}>
                <Grid item xs={7} sx={{ border: "1px solid blue" }}>
                    <Box sx={{ border: "1px solid red" }}>
                        {course.cover_type === "video" && (
                            <>
                                <video src={course.cover}> </video>
                            </>
                        )}
                        {course.cover_type === "image" && (
                            <>
                                <Avatar variant="square" src={course.cover} sx={{ width: "35vw", height: 1, objectFit: "contain" }} />
                            </>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={5} sx={{}}>
                    <Box sx={{ w: 1, flex: 1, backgroundColor: "#ff0000" }}>atenção</Box>
                </Grid>
            </Grid>
        </Box>
    )
}
