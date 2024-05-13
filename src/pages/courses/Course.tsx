import React, { useEffect, useState } from "react"
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { Course } from "../../types/server/class/Course"
import { api } from "../../api/api"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { FormAproveCourse } from "../../components/aprove/FormAproveCourse"
import { DataCard } from "../../components/course/DataCard"
import { Carrousel } from "../../components/Carrousel"
import { Media } from "../../components/media/Media"
import { Plan } from "../../types/server/class/Plan"
import { slugify } from "../../tools/urlMask"
interface CourseProps {}

export const CoursePage: React.FC<CourseProps> = ({}) => {
    const [course, setCourse] = useState(useLocation().state.data as Course)
    const medias = [{ url: course.cover, type: course.cover_type }, ...course.gallery.media.map((item) => ({ url: item.url, type: item.type }))]
    const [media, setMedia] = useState({ url: course.cover || null, type: course.cover_type })
    const [showCarrosel, setShowCarrosel] = useState(false)

    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [plans, setPlans] = useState<Plan[]>([])

    const fetchCourse = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/course", { params: { course_id: course.id } })
            setCourse(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourse()
    }, [])

    const fetchLessons = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/lesson/course", { params: { course_id: course.id } })
            setLessons(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => setLoading(false))
        }
    }

    useEffect(() => {
        fetchLessons()
    }, [])

    const fetchPlans = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await api.get("/plan")
            setPlans(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => setLoading(true))
        }
    }

    useEffect(() => {
        fetchPlans()
    }, [])

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw" }}>
            <HeaderInfo title={`Curso: ${course.name}`} refreshButton={false} exitButton={false} backButton chatButton menuButton />
            <Grid container spacing={3} sx={{ width: "75vw", height: "74vh" }}>
                <Grid item xs={7}>
                    <Box sx={{ width: 1, flexDirection: "column", gap: "1vw" }}>
                        <Box sx={{ width: 1, position: "relative", flexDirection: "column" }}>
                            <Media media={media} setShowCarrosel={setShowCarrosel} />
                            {showCarrosel && (
                                <Carrousel
                                    setMedia={setMedia}
                                    isVideo={media.type === "video"}
                                    gallery={medias}
                                    onMouseEnter={() => setShowCarrosel(true)}
                                    onMouseLeave={() => setShowCarrosel(false)}
                                />
                            )}
                        </Box>
                        <Box sx={{ height: "12vw", gap: "1vw", flexDirection: "column", overflowY: "scroll" }}>
                            <Box sx={{ width: 1, justifyContent: "space-between", alignItems: "center" }}>
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
                    <Box
                        sx={{
                            width: 1,
                            flex: 1,
                            flexDirection: "column",
                            gap: "1vw",
                            maxHeight: "71vh",
                            overflowY: "scroll",
                            mx: "-0.5vw",
                            px: "0.5vw",
                            pt: "0.1vw",
                        }}
                    >
                        <FormAproveCourse
                            plans={plans}
                            name={course.name}
                            type="course"
                            id={course.id}
                            price={course.price}
                            status={course.status}
                            onChangeStatus={fetchCourse}
                        />
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: "1vw",
                                pb: "1vw",
                                width: 1,
                            }}
                        >
                            {lessons.map((lesson) => (
                                <DataCard
                                    key={lesson.id}
                                    lesson={lesson}
                                    refreshStatus={fetchLessons}
                                    link={`/licoes/${slugify(lesson.name)}`}
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
