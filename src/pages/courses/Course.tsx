import React, { useEffect, useState } from "react"
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material"
import { useLocation, useSearchParams } from "react-router-dom"
import { Course } from "../../types/server/class/Course"
import { api } from "../../api/api"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { FormAproveCourse } from "../../components/aprove/FormAproveCourse"
import { DataCard } from "../../components/course/DataCard"
import { Carrousel } from "../../components/Carrousel"
import { Media } from "../../components/media/Media"
import { slugify } from "../../tools/urlMask"
import placeholders from "../../tools/placeholders"
import { NoFeaturedContent } from "../../components/dashboard/NoFeaturedContent"
interface CourseProps {}

export const CoursePage: React.FC<CourseProps> = ({}) => {
    const location = useLocation()
    const courseId = location.state?.courseId as Partial<Course> | undefined
    const [search] = useSearchParams()
    const [course, setCourse] = useState(location.state?.data as Course | undefined)
    const id = (course ? course?.id : courseId) || search.get("id")
    const [media, setMedia] = useState({ url: course?.cover || "", type: course?.cover_type || "image" })
    const [showCarrosel, setShowCarrosel] = useState(false)

    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<Lesson[]>([])

    const fetchCourse = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/course", { params: { course_id: id } })
            setCourse(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const fetchLessons = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/lesson/course", { params: { course_id: course?.id } })
            setLessons(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => setLoading(false))
        }
    }

    useEffect(() => {
        fetchCourse()
    }, [])

    useEffect(() => {
        if (course) {
            setMedia({ url: course.cover, type: course.cover_type })
            fetchLessons()
        }
    }, [course])

    if (!id)
        return (
            <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
                <HeaderInfo title={`Curso não encontrado`} refreshButton={false} exitButton={false} backButton />
                <NoFeaturedContent
                    styles={{ height: "37vw" }}
                    title="O link que você tentou acessar parece estar quebrado ou não existe."
                    text="Por favor, verifique se o endereço está correto ou entre em contato com o suporte técnico para mais ajuda."
                />
            </Box>
        )

    return course ? (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
            <HeaderInfo title={`Curso: ${course.name}`} refreshButton={false} exitButton={false} backButton chatButton menuButton />
            <Grid container spacing={3} sx={{ flex: 1, height: "74vh" }}>
                <Grid item xs={7}>
                    <Box sx={{ width: 1, flexDirection: "column", gap: "1vw" }}>
                        <Box sx={{ width: 1, position: "relative", flexDirection: "column" }}>
                            <Media media={media} setShowCarrosel={setShowCarrosel} />
                            {showCarrosel && (
                                <Carrousel
                                    setMedia={setMedia}
                                    isVideo={media.type === "video"}
                                    gallery={[
                                        { url: course?.cover, type: course?.cover_type },
                                        ...course.gallery.media.map((item) => ({ url: item.url, type: item.type })),
                                    ]}
                                    onMouseEnter={() => setShowCarrosel(true)}
                                    onMouseLeave={() => setShowCarrosel(false)}
                                />
                            )}
                        </Box>
                        <Box sx={{ height: "12vw", gap: "1vw", flexDirection: "column", overflowY: "scroll" }}>
                            <Box sx={{ width: 1, justifyContent: "space-between", alignItems: "center" }}>
                                <Avatar src={course.owner.image || placeholders.avatar} sx={{ width: "4vw", height: "4vw" }} />
                                <Box sx={{ flexDirection: "column" }}>
                                    <Typography variant="subtitle1" component="h5">
                                        {course.owner.nickname}
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
                            px: "0.5vw",
                        }}
                    >
                        <FormAproveCourse
                            course={course}
                            name={course.name}
                            type="course"
                            id={course.id}
                            status={course.status}
                            onChangeStatus={fetchCourse}
                        />
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: "1vw",
                                pb: "3vw",
                                width: 1,
                            }}
                        >
                            {lessons.map((lesson) => (
                                <DataCard
                                    key={lesson.id}
                                    lesson={lesson}
                                    refreshStatus={fetchLessons}
                                    link={`/licoes/${slugify(lesson.name)}?id=${lesson.id}`}
                                    routerParam={{ lesson, course }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    ) : null
}
