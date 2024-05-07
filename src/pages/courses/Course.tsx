import React, { useEffect, useState } from "react"
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { Course } from "../../types/server/class/Course"
import { api } from "../../api/api"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { FormAprove } from "../../components/aprove/FormAprove"
import { DataCard } from "../../components/course/DataCard"
import { Carrousel } from "../../components/Carrousel"
import { Media } from "../../components/media/Media"
interface CourseProps {}

export const CoursePage: React.FC<CourseProps> = ({}) => {
    const course = useLocation().state.data as Course

    const medias = [{ url: course.cover, type: course.cover_type }, ...course.gallery.media.map((item) => ({ url: item.url, type: item.type }))]

    const [media, setMedia] = useState({ url: course.cover || null, type: course.cover_type })
    const [showCarrosel, setShowCarrosel] = useState(false)

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
            <Grid container spacing={3} sx={{ width: "75vw", height: "74vh" }}>
                <Grid item xs={7}>
                    <Box sx={{ w: 1, h: 1, flexDirection: "column", gap: "1vw" }}>
                        <HeaderInfo title={`Curso: ${course.name}`} refreshButton={false} exitButton={false} backButton chatButton menuButton />
                        <Box sx={{ w: 1, h: 1, position: "relative", flexDirection: "column" }}>
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
                    <Box sx={{ pt: "1vw", w: 1, flex: 1, flexDirection: "column", gap: "1vw" }}>
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
                            }}
                        >
                            {lessons.map((lesson) => (
                                <DataCard
                                    key={lesson.id}
                                    name={lesson.name}
                                    description={lesson.info}
                                    image={lesson.thumb}
                                    link={`/licoes/${lesson.name}`}
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
