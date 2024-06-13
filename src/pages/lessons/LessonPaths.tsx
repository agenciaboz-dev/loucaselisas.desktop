import React, { useEffect, useState } from "react"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { slugify } from "../../tools/urlMask"
import { DataCard } from "../../components/courses/DataCard"
import { User } from "../../types/server/class"
import { api } from "../../api/api"
import { Course } from "../../types/server/class/Course"
import { useGetPaths } from "../../hooks/useGetPaths"

interface LessonPathsProps {
    lesson: Lesson
}

export const LessonPaths: React.FC<LessonPathsProps> = ({ lesson }) => {
    const [course, setCourse] = useState<Course>()
    const [user, setUser] = useState<User>()
    const { allPaths } = useGetPaths({ user, course, lesson })

    const fetchCourse = async () => {
        try {
            const response = await api.get("/course", { params: { course_id: lesson.course_id } })
            setCourse(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUser = async () => {
        if (!course) return
        try {
            const response = await api.get("/user", { params: { id: course?.owner.user.id } })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCourse()
    }, [])

    useEffect(() => {
        if (course) fetchUser()
    }, [course])

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <DataCard
            key={lesson.id}
            paths={allPaths}
            lesson={lesson}
            image={lesson.thumb || lesson.media.url}
            title={lesson.name}
            description={lesson.info}
            likes={lesson.likes}
            downloads={lesson.downloads}
            views={lesson.views}
            userName={lesson.course.name}
            link={`/licoes/${slugify(lesson.name)}?id:${lesson.id}`}
            routerParam={{ lesson }}
        />
    )
}
