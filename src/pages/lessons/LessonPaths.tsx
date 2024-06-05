import React, { useEffect, useMemo, useState } from "react"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { slugify } from "../../tools/urlMask"
import { DataCard } from "../../components/courses/DataCard"
import { Paths } from "../../types/paths"
import { User } from "../../types/server/class"
import { api } from "../../api/api"
import { useNavigate } from "react-router-dom"
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined"
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined"
import { Course } from "../../types/server/class/Course"
import { Box } from "@mui/material"

interface LessonPathsProps {
    lesson: Lesson
}

export const LessonPaths: React.FC<LessonPathsProps> = ({ lesson }) => {
    const navigate = useNavigate()
    const [course, setCourse] = useState<Course>()
    const [user, setUser] = useState<User>()
    const [creator, setCreator] = useState(user?.creator)

    const fetchCourse = async () => {
        try {
            const response = await api.get("/course", { params: { course_id: lesson.course_id } })
            setCourse(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUser = async () => {
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
        if (user) setCreator(user.creator)
    }, [user])

    const paths: Paths = useMemo(
        () =>
            user && creator && course
                ? [
                      {
                          link: `/licoes/${slugify(lesson.name)}?id=${lesson.id}`,
                          title: "Ver Lição",
                          icon: <VisibilityOutlined />,
                          id: lesson.id,
                          onClick: () => navigate(`/licoes/${slugify(lesson.name)}?id=${lesson.id}`),
                      },
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
            key={lesson.id}
            paths={paths}
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
