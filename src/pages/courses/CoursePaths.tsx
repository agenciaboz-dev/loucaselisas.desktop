import React, { useEffect, useMemo, useState } from "react"
import { User } from "../../types/server/class"
import { api } from "../../api/api"
import { Course } from "../../types/server/class/Course"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../types/paths"
import { slugify } from "../../tools/urlMask"
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined"
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined"
import { DataCard } from "../../components/courses/DataCard"

interface CoursePathsProps {
    course: Course
}

export const CoursePaths: React.FC<CoursePathsProps> = ({ course }) => {
    const [user, setUser] = useState<User>()
    const [creator, setCreator] = useState(user?.creator)
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const response = await api.get("/user", { params: { id: course.owner.user.id } })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const paths: Paths = useMemo(
        () =>
            user && creator
                ? [
                      {
                          link: `/cursos/${slugify(course.name)}?id=${course.id}`,
                          title: "Ver Curso",
                          icon: <VisibilityOutlined />,
                          id: course.id,
                          onClick: () => navigate(`/cursos/${slugify(course.name)}?id=${course.id}`),
                      },
                      {
                          link: `/usuarios/${slugify(creator.nickname)}?id=${user.id}`,
                          title: "Ver Usuario",
                          icon: <VisibilityOutlined />,
                          id: user.id,
                          onClick: () => navigate(`/criadores/${slugify(creator.nickname)}?id=${user.id}`),
                      },
                      {
                          link: `/grupos/id=${user.id}`,
                          title: "Ver Chat",
                          icon: <ChatOutlinedIcon />,
                          id: user.id,
                          onClick: () => navigate(`/grupos?id=${course.id}`),
                      },
                  ]
                : [],
        [user]
    )

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            setCreator(user.creator)
        }
    }, [user])

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
