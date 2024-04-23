import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { Lesson } from "../types/server/class/Course/Lesson"
import { api } from "../api/api"

interface LessonsProps {}

export const Lessons: React.FC<LessonsProps> = ({}) => {
    const [loading, setLoading] = useState(false)

    const getLessons = async () => {
        let lessons: Lesson[] | undefined
        setLoading(true)

        try {
            const response = await api.get("lesson/all")
            lessons = response.data
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

    return <Box sx={{ color: loading ? "red" : "" }}>Lições</Box>
}
