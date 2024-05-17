import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import { Course } from "../types/server/class/Course"
import { useGetCourses } from "../hooks/useGetCourses"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { FilteredCourses } from "../components/dashboard/FilteredCourses"
import { FilteredListCourses } from "../components/dashboard/FilteredListCourses"

export const DashBoard: React.FC = ({}) => {
    const [courses, setCourses] = useState<Course[]>([])
    const { getCourses, loading } = useGetCourses()

    const fetchCourses = async () => {
        const courses = await getCourses()
        if (!courses) {
            console.log("erro ao carregar cursos")
            return
        }

        setTimeout(() => {
            setCourses(courses.sort((a, b) => Number(b.published) - Number(a.published)))
        }, 300)
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <Box sx={{ width: 1, flexDirection: "column" }}>
            <HeaderInfo title="painel de controle" loading={loading} refreshCallback={() => fetchCourses()} />
            <Box
                sx={{
                    flexDirection: "column",
                    height: "72.8vh",
                    width: "73.2vw",
                    gap: "0.8vw",
                    pt: "0.2vw",
                }}
            >
                <FilteredCourses loading={loading} courses={courses} />
                <Typography variant="h2" component="h2" sx={{ fontSize: "1.2rem" }}>
                    Explorar
                </Typography>
                <FilteredListCourses courses={courses} loading={loading} />
            </Box>
        </Box>
    )
}
