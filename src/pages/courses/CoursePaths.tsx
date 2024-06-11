import React, { useEffect, useState } from "react"
import { User } from "../../types/server/class"
import { api } from "../../api/api"
import { Course } from "../../types/server/class/Course"
import { slugify } from "../../tools/urlMask"
import { DataCard } from "../../components/courses/DataCard"
import { useGetPaths } from "../../hooks/useGetPaths"
import { ReproveModal } from "../../components/aprove/ReproveModal"

interface CoursePathsProps {
    course: Course
}

export const CoursePaths: React.FC<CoursePathsProps> = ({ course }) => {
    const [user, setUser] = useState<User>()
    const [openModal, setOpenModal] = useState<boolean>(false)

    const fetchUser = async () => {
        try {
            const response = await api.get("/user", { params: { id: course.owner.user.id } })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const { coursePaths, reproveCourse } = useGetPaths({ user, course, setOpenModal })

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <ReproveModal
                name={course.name}
                onConfirm={reproveCourse}
                type="course"
                openReproveModal={openModal}
                setOpenReproveModal={setOpenModal}
            />
            <DataCard
                key={course.id}
                paths={coursePaths}
                course={course}
                image={course.cover}
                title={course.name}
                description={course.description}
                likes={course.likes}
                downloads={course.downloads}
                messages={course.chat?.messages}
                views={course.views}
                userName={course.owner.user.username}
                link={`/cursos/${slugify(course.name)}?id=${course.id}`}
                routerParam={course}
            />
        </>
    )
}
