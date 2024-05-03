import React, { useEffect, useState } from "react"
import { Avatar, Box, Grid, IconButton, Paper, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { Course } from "../../types/server/class/Course"
import { api } from "../../api/api"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { FormAprove } from "../../components/aprove/FormAprove"
import { DataCard } from "../../components/course/DataCard"
import { Carrousel } from "../../components/Carrousel"
interface CourseProps {}

export const CoursePage: React.FC<CourseProps> = ({}) => {
    const course = useLocation().state.data as Course
    // const isVideo = course.cover_type === "video"

    // const [gallery, setGallery] = useState([{ url: course.cover }])

    // setGallery([
    //     ...gallery,
    //     ...course.gallery.media.map((item) => ({
    //         url: item.url,
    //     })),
    // ])

    const medias = [{ url: course.cover, type: course.cover_type }, ...course.gallery.media.map((item) => ({ url: item.url, type: item.type }))]

    const [media, setMedia] = useState({ url: course.cover, type: course.cover_type })

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
            <Grid container spacing={3} sx={{ width: "75vw", height: "74vh" }}>
                <Grid item xs={7}>
                    <Box sx={{ w: 1, h: 1, flexDirection: "column", gap: "1vw" }}>
                        <Box sx={{ w: 1, h: 1 }}></Box>

                        {media.type === "video" && (
                            <Paper sx={{ borderRadius: "1vw" }}>
                                <video src={media.url} controls style={{ borderRadius: "1vw", width: "100%" }} />
                            </Paper>
                        )}
                        {media.type === "image" && (
                            <Paper sx={{ borderRadius: "1vw" }}>
                                <Avatar variant="rounded" src={media.url} sx={{ width: 1, height: 1, objectFit: "contain", borderRadius: "1vw" }} />
                            </Paper>
                        )}

                        {/* <Box sx={{ position: "absolute" }}>
                            <Carrousel setMedia={setMedia} gallery={medias} />
                        </Box> */}
                        <Box sx={{ height: "12vw", gap: "1vw", flexDirection: "column", overflowY: "scroll" }}>
                            <Box sx={{ w: 1, justifyContent: "space-between", alignItems: "center" }}>
                                <Avatar src={course.owner.image || "/placeholders/perfil.webp"} sx={{ width: "4vw", height: "4vw" }} />
                                <Box sx={{ flexDirection: "column" }}>
                                    <Typography variant="subtitle1" component="h5">
                                        {course.owner.user.name}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        sx={{
                                            width: "34vw",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "normal",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                        }}
                                    >
                                        {course.owner.description}
                                    </Typography>
                                </Box>
                                <IconButton sx={{ height: "2vw", p: "0.25vw", mr: "0.5vw" }}>
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ pr: "0.9vw" }}>
                                <Typography variant="body1" component="p">
                                    {course.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={5} sx={{}}>
                    <Box sx={{ w: 1, flex: 1, flexDirection: "column", gap: "1vw" }}>
                        <FormAprove name={course.name} type="course" id={course.id} price={course.price} options />
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: "1vw",
                                pb: "1vw",
                                w: 1,
                                height: "28.3vw",
                                overflowY: "scroll",
                                mx: "-0.5vw",
                                px: "0.5vw",
                                // border: "1px solid red",
                            }}
                        >
                            {lessons.map((lesson) => (
                                <DataCard key={lesson.id} name={lesson.name} description={lesson.info} image={lesson.thumb} />
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
