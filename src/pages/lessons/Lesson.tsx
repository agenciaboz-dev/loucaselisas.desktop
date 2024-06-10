import React, { useEffect, useState } from "react"
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import { useLocation, useSearchParams } from "react-router-dom"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { Media } from "../../components/media/Media"
import { api } from "../../api/api"
import { Course } from "../../types/server/class/Course"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { FormAproveLesson } from "../../components/aprove/FormAproveLesson"
import { DataCard } from "../../components/course/DataCard"
import { slugify } from "../../tools/urlMask"
import placeholders from "../../tools/placeholders"
import { NoFeaturedContent } from "../../components/dashboard/NoFeaturedContent"

interface LessonPageProps {}

export const LessonPage: React.FC<LessonPageProps> = ({}) => {
    const locationState = useLocation().state
    const [search] = useSearchParams()
    const [lesson, setLesson] = useState(locationState?.data.lesson as Lesson | undefined)
    const [course, setCourse] = useState(locationState?.data.course as Course | undefined)
    const [media, setMedia] = useState({ url: lesson?.media.url || "", type: lesson?.media.type || "image" })
    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<Lesson[]>([])
    const lessonId = lesson ? lesson.id : search.get("id")

    console.log(lessonId)
    // const otherLessons = lessons.filter((item) => item.id !== lesson?.id).sort((a, b) => Number(a.published) - Number(b.published))

    const fetchLesson = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await api.get("/lesson", { params: { lesson_id: lessonId } })
            const data = response.data as Lesson
            setLesson(data)
            setMedia({ url: data.media.url, type: data.media.type })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCourse = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await api.get("/course", { params: { course_id: lesson?.course_id } })
            setCourse(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setInterval(() => {
                setLoading(true)
            }, 500)
        }
    }

    const fetchLessons = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/lesson/course", { params: { course_id: lesson?.course_id } })
            setLessons(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (locationState) {
            setLesson(locationState.data.lesson)
        }
    }, [locationState])

    useEffect(() => {
        fetchLesson()
    }, [])

    useEffect(() => {
        if (lesson) {
            fetchCourse()
            fetchLessons()
            setMedia({ url: lesson?.media.url || "", type: lesson?.media.type || "image" })
        }
    }, [lesson])

    // const [showCarrosel, setShowCarrosel] = useState(false)

    if (!lessonId)
        return (
            <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
                <HeaderInfo title={`Lição não encontrada`} refreshButton={false} exitButton={false} backButton />
                <NoFeaturedContent
                    styles={{ height: "37vw" }}
                    title="O link que você tentou acessar parece estar quebrado ou não existe."
                    text="Por favor, verifique se o endereço está correto ou entre em contato com o suporte técnico para mais ajuda."
                />
            </Box>
        )

    return lesson === undefined ? (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
            <HeaderInfo title={`Lição não encontrada`} refreshButton={false} exitButton={false} backButton />
            <NoFeaturedContent
                styles={{ height: "37vw" }}
                title="O link que você tentou acessar parece estar quebrado ou não existe."
                text="Por favor, verifique se o endereço está correto ou entre em contato com o suporte técnico para mais ajuda."
            />
        </Box>
    ) : (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
            <HeaderInfo title={`Lição: ${lesson?.name}`} backButton exitButton={false} refreshButton={false} chatButton menuButton />
            <Grid container spacing={3} sx={{ flex: 1, height: "74vh" }}>
                <Grid item xs={7}>
                    <Box sx={{ width: 1, flexDirection: "column", gap: "1vw" }}>
                        <Box sx={{ width: 1, position: "relative", flexDirection: "column" }}>{lesson && <Media media={media} />}</Box>
                        <Box sx={{ height: "12vw", gap: "1vw", flexDirection: "column", overflowY: "scroll" }}>
                            <Box sx={{ width: 1, gap: "1vw", alignItems: "center" }}>
                                <Avatar src={course?.owner?.image || placeholders.avatar} sx={{ width: "4vw", height: "4vw" }} />
                                <Box sx={{ flexDirection: "column" }}>
                                    <Typography variant="subtitle1" component="h5">
                                        {course?.owner?.user.name}
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
                                        {course?.owner?.description}
                                    </Typography>
                                </Box>
                                {/* <IconButton sx={{ height: "2vw", p: "0.25vw", mr: "0.5vw" }}>
                                    <MoreVertIcon />
                                </IconButton> */}
                            </Box>
                            <Box sx={{ pr: "0.9vw", pb: "1vw" }}>
                                <Typography variant="body1" component="p">
                                    {course?.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Box sx={{ width: 1, flex: 1, flexDirection: "column", gap: "1vw" }}>
                        {course && lesson && (
                            <FormAproveLesson name={lesson.name} lesson={lesson} type="lesson" id={lesson.id} status={lesson.status} />
                        )}
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: "1vw",
                                pb: "3vw",
                                width: 1,
                                height: lesson?.status === "pending" ? "28.3vw" : "32.7vw",
                                overflowY: "scroll",
                                px: "0.5vw",
                            }}
                        >
                            {course &&
                                lesson &&
                                lessons
                                    .filter((item) => item.id !== lesson?.id)
                                    .sort((a, b) => Number(a.published) - Number(b.published))
                                    .map((lesson) => (
                                        <DataCard
                                            key={lesson.id}
                                            lesson={lesson}
                                            refreshStatus={fetchLessons}
                                            // refreshLesson={fetchLesson}
                                            link={`/licoes/${slugify(lesson.name)}?id=${lesson.id}`}
                                            routerParam={{ lesson, course }}
                                        />
                                    ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
