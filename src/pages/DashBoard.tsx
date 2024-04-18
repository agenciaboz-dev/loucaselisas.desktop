import React, { useEffect, useRef, useState } from "react"
import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material"
import { api } from "../api/api"
import { CoursersThumb } from "../components/dashboard/CoursesThumb"
import { Course } from "../types/server/class/Course"
import { useDraggable } from "react-use-draggable-scroll"
import { CoursesList } from "../components/dashboard/CoursesList"

interface DashBoardProps {
    setRefreshCallback: React.Dispatch<React.SetStateAction<() => void>>
    setCarregando: React.Dispatch<React.SetStateAction<boolean>>
}

export const DashBoard: React.FC<DashBoardProps> = ({ setRefreshCallback, setCarregando }) => {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(false)
    const skeletonCourse = new Array(20).fill(`course`)

    const getCourses = async () => {
        setCarregando(true)
        setLoading(true)
        try {
            const response = await api.get("/course/all")
            console.log({ courses: response.data })

            setCourses(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
                setCarregando(false)
            }, 500)
        }
    }

    useEffect(() => {
        getCourses()
        setRefreshCallback(() => getCourses)
    }, [])

    console.log(courses)

    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })

    return (
        <Box
            sx={{
                flexDirection: "column",
                height: "64vh",
                width: 1,
                gap: "0.8vw",
            }}
        >
            <Box ref={ref} {...events} sx={{ width: "73.5vw", overflowX: "scroll", height: "auto", scrollbarWidth: "none", gap: "0.5vw" }}>
                {loading
                    ? skeletonCourse.map((course) => (
                          <Skeleton
                              key={course.index}
                              variant="rounded"
                              animation="wave"
                              sx={{
                                  height: "13vw",
                                  aspectRatio: "4/3",
                                  flexShrink: 0,
                                  borderRadius: "1.2vw",
                              }}
                          />
                      ))
                    : courses.map((course) => <CoursersThumb key={course.id} course={course} />)}
            </Box>

            <Typography variant="h2" component="h2" sx={{ fontSize: "1.2rem" }}>
                Explorar
            </Typography>
            <Box
                sx={{
                    overflowY: "scroll",
                    flex: 1,
                    flexDirection: "column",
                    // height: "55vh",
                    gap: "0.5vw",
                    border: "1px sold blue",
                    pt: "0.1vw",
                    mx: "-1.5vw",
                    px: "1.5vw",
                }}
            >
                <Grid container columns={2} spacing={2}>
                    {loading
                        ? skeletonCourse.map((course) => (
                              <Grid item key={course.index} xs={1}>
                                  <Paper elevation={3} sx={{ flex: 1, p: "0.5vw", gap: "1vw" }}>
                                      <Skeleton variant="rounded" animation="wave" sx={{ width: "5vw", height: "5vw" }} />
                                      <Box sx={{ justifyContent: "space-between", flexDirection: "column" }}>
                                          <Skeleton variant="text" animation="wave" sx={{ width: "10vw" }} />
                                          <Skeleton variant="text" animation="wave" sx={{ width: "28.5vw", height: "4vw" }} />
                                      </Box>
                                  </Paper>
                              </Grid>
                          ))
                        : courses.map((course) => <CoursesList key={course.id} course={course} />)}
                </Grid>
            </Box>
        </Box>
    )
}
