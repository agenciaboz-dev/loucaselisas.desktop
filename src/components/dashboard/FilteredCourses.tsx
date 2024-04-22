import React, { useEffect, useRef, useState } from "react"
import { Box, Skeleton } from "@mui/material"
import { Course } from "../../types/server/class/Course"
import { Filters } from "../pageLayout/Filters"
import { useDraggable } from "react-use-draggable-scroll"
import { CoursersThumb } from "./CoursesThumb"

interface FilteredCoursesProps {
    courses: Course[]
    loading: boolean
}

export const FilteredCourses: React.FC<FilteredCoursesProps> = ({ courses, loading }) => {
    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })
    const skeletonCourse = new Array(20).fill(`course`)

    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)
    const [active, setActive] = useState("popular")
    const [skeletonLoading, setSkeletonLoading] = useState(loading)

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

    return (
        <Box sx={{ flex: 1, flexDirection: "column", gap: "1vw" }}>
            <Filters courses={courses} onFilter={onFilteredCourses} active={active} setActive={setActive} />
            <Box
                ref={ref}
                {...events}
                sx={{ width: "76.25vw", overflowX: "scroll", height: "auto", scrollbarWidth: "none", gap: "0.5vw", px: "1.5vw", mx: "-1.5vw" }}
            >
                {skeletonLoading
                    ? skeletonCourse.map((_, index) => (
                          <Skeleton
                              key={index}
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
                    : filteredCourses.map((course) => <CoursersThumb key={course.id} course={course} />)}
            </Box>
        </Box>
    )
}
