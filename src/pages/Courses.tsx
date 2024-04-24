import React, { useEffect, useRef, useState } from "react"
import { Box, Divider, Grid, Paper, Skeleton } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { useGetCourses } from "../hooks/useGetCourses"
import { Course } from "../types/server/class/Course"
import { FilterCourses } from "../components/pageLayout/FilterCourses"
import { SearchBar } from "../components/header/SearchBar"
import { DataCard } from "../components/courses/DataCard"
import { useDraggable } from "react-use-draggable-scroll"

interface CourrsesProps {}

export const Courses: React.FC<CourrsesProps> = ({}) => {
    const [active, setActive] = useState("popular")
    const [courses, setCourses] = useState<Course[]>([])
    const { getCourses, loading } = useGetCourses()
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)
    const skeletonCourse = new Array(20).fill(`course`)
    const [skeletonLoading, setSkeletonLoading] = useState(loading)

    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })

    const fetchCourses = async () => {
        const courses = await getCourses()
        if (!courses) {
            console.log("erro ao carregar cursos")
            return
        }

        setTimeout(() => {
            setCourses(courses)
        }, 300)
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    const onFilteredCourses = (filtered_courses: Course[]) => {
        setSkeletonLoading(true)

        setTimeout(() => {
            setFilteredCourses(filtered_courses)
            setSkeletonLoading(false)
        }, 200)
    }

    useEffect(() => {
        setSkeletonLoading(loading)
    }, [loading])
    useEffect(() => {
        setFilteredCourses(courses)
        const currentFilter = active
        setActive(currentFilter)
    }, [courses])

    const handleSearch = (value: string) => {
        setFilteredCourses(courses.filter((course) => course.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
    }

    useEffect(() => {
        setFilteredCourses(courses)
    }, [courses])

    return (
        <>
            <Box sx={{ width: 1, flexDirection: "column" }}>
                <HeaderInfo loading={loading} title="Cursos" refreshCallback={() => fetchCourses()} />
                <Box
                    sx={{
                        flexDirection: "column",
                        height: "72.8vh",
                        width: 1,
                        gap: "0.8vw",
                        pt: "0.2vw",
                    }}
                >
                    <FilterCourses courses={courses} active={active} onFilter={onFilteredCourses} setActive={setActive} />
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
                            {skeletonLoading
                                ? skeletonCourse.map((_, index) => (
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
                                : filteredCourses.map((course) => (
                                      <DataCard
                                          key={course.id}
                                          image={course.cover}
                                          title={course.name}
                                          description={course.description}
                                          likes={course.likes}
                                          downloads={course.downloads}
                                          messages={course.chat?.messages}
                                          views={course.views}
                                          userName={course.owner.user.username}
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
