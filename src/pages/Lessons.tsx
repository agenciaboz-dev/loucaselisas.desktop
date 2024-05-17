import React, { useEffect, useRef, useState } from "react"
import { Box, Divider, Grid, Paper, Skeleton } from "@mui/material"
import { Lesson } from "../types/server/class/Course/Lesson"
import { api } from "../api/api"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { SearchBar } from "../components/header/SearchBar"
import { useDraggable } from "react-use-draggable-scroll"
import { DataCard } from "../components/courses/DataCard"
import { slugify } from "../tools/urlMask"
import { NoFeaturedContent } from "../components/dashboard/NoFeaturedContent"
import { FilterLessons } from "../components/pageLayout/FilterLessons"

interface LessonsProps {}

export const Lessons: React.FC<LessonsProps> = ({}) => {
    const skeletonLessons: number[] = new Array(20).fill(0).map((_, index) => index)
    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })

    const [lessons, setLessons] = useState<Lesson[]>([])
    const [active, setActive] = useState<string>("recent")
    const [filteredLessons, setFilteredLessons] = useState<Lesson[]>(lessons)
    const [loading, setLoading] = useState<boolean>(false)

    const getLessons = async () => {
        setLoading(true)
        try {
            const response = await api.get("lesson/all")
            setLessons(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => setLoading(false), 500)
        }
    }

    const onFilteredLessons = (filteredLessons: Lesson[]) => {
        setLoading(true)
        setTimeout(() => {
            setFilteredLessons(filteredLessons)
            setLoading(false)
        }, 200)
    }

    const handleSearch = (value: string) => {
        setFilteredLessons(lessons.filter((lesson) => lesson.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
    }

    useEffect(() => {
        getLessons()
    }, [])

    useEffect(() => {
        setFilteredLessons(lessons)
    }, [lessons])

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
                    <FilterLessons active={active} lessons={lessons} onFilter={onFilteredLessons} setActive={setActive} />
                    <SearchBar handleSearch={(value) => handleSearch(value)} />
                    <Box
                        ref={ref}
                        {...events}
                        sx={{
                            height: filteredLessons.length === 0 ? "65vh" : "67vh",
                            pt: "0.2vw",
                            overflowY: "scroll",
                            scrollbarWidth: "none",
                            gap: "0.5vw",
                            px: "1.5vw",
                            mx: "-1.5vw",
                            flexDirection: "column",
                        }}
                    >
                        {filteredLessons.length === 0 ? (
                            <>
                                <NoFeaturedContent />
                            </>
                        ) : (
                            <>
                                <Grid container columns={3} spacing={2} sx={{ pb: "1vw" }}>
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
                                                  link={`/licoes/${slugify(lesson.name)}`}
                                                  routerParam={{ lesson }}
                                              />
                                          ))}
                                </Grid>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}
