import React, { useEffect, useMemo, useState } from "react"
import { User } from "../../types/server/class"
import { api } from "../../api/api"
import { Course } from "../../types/server/class/Course"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../types/paths"
import { slugify } from "../../tools/urlMask"
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined"
import { DataCard } from "../../components/courses/DataCard"

interface CoursePathsProps {
    course: Course
}

export const CoursePaths: React.FC<CoursePathsProps> = ({ course }) => {
    const [user, setUser] = useState<User>()
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const response = await api.get("/creator", { params: { id: course.owner_id } })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const paths: Paths = useMemo(
        () =>
            user
                ? [
                      {
                          link: `/cursos/${slugify(course.name)}?id=${course.id}`,
                          title: "Ver Curso",
                          icon: <VisibilityOutlined />,
                          id: course.id,
                          onClick: () => navigate(`/cursos/${slugify(course.name)}?id=${course.id}`),
                      },
                      {
                          link: `/usuarios/${slugify(user.creator!.nickname)}?id=${user.creator!.id}`,
                          title: "Ver Usuario",
                          icon: <VisibilityOutlined />,
                          id: user.id,
                          onClick: () => navigate(`/criadores/${slugify(user.creator!.nickname)}?id=${user.creator!.id}`),
                      },
                  ]
                : [],
        [user]
    )

    console.log(paths)

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <DataCard
            key={course.id}
            paths={paths}
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
    )
}
