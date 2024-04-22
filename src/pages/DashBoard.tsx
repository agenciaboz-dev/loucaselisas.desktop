import React, { useEffect, useState } from "react"
import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material"
import { Course } from "../types/server/class/Course"
import { CoursesList } from "../components/dashboard/CoursesList"
import { useGetCourses } from "../hooks/useGetCourses"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { SearchBar } from "../components/header/SearchBar"
import { FilteredCourses } from "../components/dashboard/FilteredCourses"

export const DashBoard: React.FC = ({}) => {
    const [courses, setCourses] = useState<Course[]>([])
    const skeletonCourse = new Array(20).fill(`course`)
    const { getCourses, loading } = useGetCourses()

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

    useEffect(() => {}, [loading])

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <Box sx={{ width: 1, flexDirection: "column" }}>
            <HeaderInfo title="painel de controle" loading={loading} refreshCallback={() => fetchCourses()} />
            <SearchBar />
            <Box
                sx={{
                    flexDirection: "column",
                    height: "64vh",
                    width: 1,
                    gap: "0.8vw",
                    pt: "1vw",
                }}
            >
                <FilteredCourses loading={loading} courses={courses} />

                <Typography variant="h2" component="h2" sx={{ fontSize: "1.2rem" }}>
                    Explorar
                </Typography>
                <Box
                    sx={{
                        overflowY: "scroll",
                        flex: 1,
                        flexDirection: "column",
                        gap: "0.5vw",
                        pt: "0.1vw",
                        mx: "-1.5vw",
                        px: "1.5vw",
                    }}
                >
                    <Grid container columns={2} spacing={2}>
                        {loading
                            ? skeletonCourse.map((_, index) => (
                                  <Grid item key={index} xs={1}>
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
        </Box>
    )
}
