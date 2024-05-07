import React, { useEffect, useState } from "react"
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import { useLocation } from "react-router-dom"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { Media } from "../../components/media/Media"
import { Carrousel } from "../../components/Carrousel"
import { api } from "../../api/api"
import { Course } from "../../types/server/class/Course"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { FormAproveCourse } from "../../components/aprove/FormAproveCourse"
import { FormAproveLesson } from "../../components/aprove/FormAproveLesson"

interface LessonPageProps {}

export const LessonPage: React.FC<LessonPageProps> = ({}) => {
    const lesson = useLocation().state.data.lesson as Lesson
    const course = useLocation().state.data.course as Course
    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<Lesson[]>([])
    console.log({ Lessons: lessons })
    // const [course, setCourse] = useState<Course | null>(null)
    console.log({ Course: course })
    // const fetchCourse = async () => {
    //     if (loading) return
    //     setLoading(true)

    //     try {
    //         const response = await api.get("/course", { params: { course_id: lesson.course_id } })
    //         setCourse(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     fetchCourse()
    // }, [])

    const fetchLessons = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/lesson/course", { params: { course_id: lesson.course_id } })
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

    const [media, setMedia] = useState({ url: lesson.media.url, type: lesson.media.type })
    // const [showCarrosel, setShowCarrosel] = useState(false)

    return (
        <Box sx={{ flexDirection: "column" }}>
            <Grid container spacing={3} sx={{ width: "75vw", height: "74vh" }}>
                <Grid item xs={7}>
                    <Box sx={{ w: 1, h: 1, flexDirection: "column", gap: "1vw" }}>
                        <HeaderInfo title={`Lição: ${lesson.name}`} backButton exitButton={false} refreshButton={false} chatButton menuButton />
                        <Box sx={{ w: 1, h: 1, position: "relative", flexDirection: "column" }}>
                            <Media media={media} />
                            {/* {showCarrosel && (
                                <Carrousel
                                    setMedia={setMedia}
                                    isVideo={media.type === "video"}
                                    gallery={medias}
                                    onMouseEnter={() => setShowCarrosel(true)}
                                    onMouseLeave={() => setShowCarrosel(false)}
                                />
                            )} */}
                        </Box>
                        <Box sx={{ height: "12vw", gap: "1vw", flexDirection: "column", overflowY: "scroll" }}>
                            <Box sx={{ w: 1, justifyContent: "space-between", alignItems: "center" }}>
                                <Avatar src={course?.owner.image || "/placeholders/perfil.webp"} sx={{ width: "4vw", height: "4vw" }} />
                                <Box sx={{ flexDirection: "column" }}>
                                    <Typography variant="subtitle1" component="h5">
                                        {course?.owner.user.name}
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
                                        {course?.owner.description}
                                    </Typography>
                                </Box>
                                <IconButton sx={{ height: "2vw", p: "0.25vw", mr: "0.5vw" }}>
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ pr: "0.9vw" }}>
                                <Typography variant="body1" component="p">
                                    {course?.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Box sx={{ pt: "1vw", w: 1, flex: 1, flexDirection: "column", gap: "1vw" }}>
                        {course && <FormAproveLesson name={lesson.name} type="lesson" id={lesson.id} />}
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
                            }}
                        >
                            {/* {lessons.map((lesson) => (
                                <DataCard
                                    key={lesson.id}
                                    name={lesson.name}
                                    description={lesson.info}
                                    image={lesson.thumb}
                                    link={`/licoes/${lesson.name}`}
                                    routerParam={lesson}
                                />
                            ))} */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
