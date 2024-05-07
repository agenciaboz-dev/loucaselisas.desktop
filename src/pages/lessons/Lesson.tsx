import React, { useEffect, useState } from "react"
import { Box, Grid } from "@mui/material"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import { useLocation } from "react-router-dom"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { Media } from "../../components/media/Media"
import { Carrousel } from "../../components/Carrousel"
import { api } from "../../api/api"

interface LessonPageProps {}

export const LessonPage: React.FC<LessonPageProps> = ({}) => {
    const lesson = useLocation().state.data as Lesson

    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<Lesson[]>([])

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

    const [media, setMedia] = useState({ url: lesson.thumb, type: lesson.media.type })
    // const medias = [{ url: lesson.thumb, type: lesson.media.type }, ...lessons.map((lesson) => ({ url: lesson.thumb, type: lesson.media.type }))]
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
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
