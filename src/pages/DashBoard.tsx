import React, { useEffect, useRef, useState } from "react"
import { Box } from "@mui/material"
import { api } from "../api/api"
import { CoursersThumb } from "../components/dashboard/CoursesThumb"
import { Course } from "../types/server/class/Course"
import { useDraggable } from "react-use-draggable-scroll"

interface DashBoardProps {}

export const DashBoard: React.FC<DashBoardProps> = ({}) => {
    const [courses, setCourses] = useState<Course[]>([])

    const getCourses = async () => {
        try {
            const response = await api.get("/course/all")

            setCourses(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    console.log(courses)

    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })

    return (
        <Box>
            <Box ref={ref} {...events} sx={{ width: "73.5vw", overflowX: "scroll", height: 1, scrollbarWidth: "none" }}>
                {courses.map((course) => (
                    <CoursersThumb key={course.id} course={course} />
                ))}
            </Box>
        </Box>
    )
}
