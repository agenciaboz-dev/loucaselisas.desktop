import React, { useEffect, useState } from "react"
import { Box, Grid, Paper, Skeleton } from "@mui/material"
import { Course } from "../../types/server/class/Course"
import { CoursesList } from "./CoursesList"
import { SearchBar } from "../header/SearchBar"

interface FilteredListCoursesProps {
    loading: boolean
    courses: Course[]
}

export const FilteredListCourses: React.FC<FilteredListCoursesProps> = ({ loading, courses }) => {
    const skeletonCourse = new Array(20).fill(`course`)

    const [filteredCourseList, setFilteredCourseList] = useState(courses)

    const handleSearch = (value: string) => {
        setFilteredCourseList(courses.filter((course) => course.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
    }

    useEffect(() => {
        setFilteredCourseList(courses)
    }, [courses])

    return (
        <>
            <SearchBar handleSearch={(value) => handleSearch(value)} />
            <Box
                sx={{
                    overflowY: "scroll",
                    flex: 1,
                    flexDirection: "column",
                    gap: "0.5vw",
                    pt: "0.1vw",
                    pb: "1vw",
                    mx: "-1.5vw",
                    px: "1.5vw",
                    // scroll,
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
                        : filteredCourseList.map((course) => <CoursesList key={course.id} course={course} />)}
                </Grid>
            </Box>
        </>
    )
}
