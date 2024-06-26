import { useState } from "react"
import { api } from "../api/api"
import { Course } from "../types/server/class/Course"

export const useGetCourses = () => {
    const [loading, setLoading] = useState(true)

    const getCourses = async () => {
        let courses: Course[] | undefined
        setLoading(true)

        try {
            const response = await api.get("/course/admin")
            courses = response.data
        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => setLoading(false), 500)
        }

        return courses
    }

    return { getCourses, loading }
}
