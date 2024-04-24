import React, { useEffect, useRef, useState } from "react"
import { Box, Divider, Grid, Paper, Skeleton } from "@mui/material"
import { Lesson } from "../types/server/class/Course/Lesson"
import { api } from "../api/api"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { SearchBar } from "../components/header/SearchBar"
import { useDraggable } from "react-use-draggable-scroll"
import { DataCard } from "../components/courses/DataCard"

interface LessonsProps {}

export const Lessons: React.FC<LessonsProps> = ({}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const skeletonLessons: number[] = new Array(20).fill(0).map((_, index) => index)

    const [lessons, setLessons] = useState<Lesson[]>([])
    const [filteredLessons, setFilteredLessons] = useState<Lesson[]>(lessons)
    // const [active, setActive] = useState<string>("aprovados")

    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })

    const getLessons = async () => {
        setLoading(true)
        try {
            const response = await api.get("lesson/all")
            setLessons(response.data)
            console.log({ lessons: response.data })
        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => setLoading(false), 500)
        }
    }

    useEffect(() => {
        getLessons()
    }, [])

    const handleSearch = (value: string) => {
        setFilteredLessons(lessons.filter((lesson) => lesson.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
    }

    useEffect(() => {
        setFilteredLessons(lessons)
    }, [lessons])

    // const onFilteredLessons = (filteredLessons: Lesson[]) => {
    //     setLoading(true)

    //     setTimeout(() => {
    //         setFilteredLessons(filteredLessons)
    //         setLoading(false)
    //     }, 200)
    // }

    return (
        <>
            <Box sx={{ width: 1, flexDirection: "column" }}>
                <HeaderInfo title="Lições" loading={loading} refreshCallback={() => getLessons()} />
                <Box
                    sx={{
                        flexDirection: "column",
                        width: 1,
                        gap: "0.8vw",
                        pt: "0.2vw",
                    }}
                >
                    <SearchBar handleSearch={(value) => handleSearch(value)} />
                    <Box
                        ref={ref}
                        {...events}
                        sx={{
                            height: "61.3vh",
                            pt: "0.2vw",
                            overflowY: "scroll",
                            scrollbarWidth: "none",
                            gap: "0.5vw",
                            px: "1.5vw",
                            mx: "-1.5vw",
                            flexDirection: "column",
                        }}
                    >
                        <Grid container columns={3} spacing={2}>
                            {loading
                                ? skeletonLessons.map((index) => (
                                      <Grid item key={index} xs={1}>
                                          <Paper sx={{ flexDirection: "column", p: "0.5vw", gap: "0.5vw" }}>
                                              <Box sx={{ justifyContent: "space-between" }}>
                                                  <Skeleton variant="rounded" animation="wave" sx={{ width: "5vw", height: "5vw" }} />
                                                  <Box sx={{ flexDirection: "column" }}>
                                                      <Skeleton variant="text" animation="wave" sx={{ width: "10vw" }} />
                                                      <Skeleton variant="text" animation="wave" sx={{ width: "14.8vw", height: "4.8vw" }} />
                                                  </Box>
                                                  <Skeleton variant="rounded" animation="wave" sx={{ width: "1.5vw", height: "1.5vw" }} />
                                              </Box>
                                              <Divider sx={{ mt: "-0.8vw" }} />
                                              <Box sx={{ justifyContent: "space-between" }}>
                                                  <Skeleton variant="text" animation="wave" sx={{ width: "10vw" }} />
                                                  <Skeleton variant="text" animation="wave" sx={{ width: "10vw", height: "1.6rem" }} />
                                              </Box>
                                          </Paper>
                                      </Grid>
                                  ))
                                : filteredLessons.map((lesson) => (
                                      <DataCard
                                          key={lesson.id}
                                          image={lesson.thumb || lesson.media.url}
                                          title={lesson.name}
                                          description={lesson.info}
                                          likes={lesson.likes}
                                          downloads={lesson.downloads}
                                          views={lesson.views}
                                          userName={lesson.course.name}
                                          link={"/courses"}
                                      />
                                  ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
