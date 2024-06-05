import { useMemo, useState } from "react"
import { Creator, User } from "../types/server/class"
import { Paths } from "../types/paths"
import { slugify } from "../tools/urlMask"
import { Course } from "../types/server/class/Course"
import { useNavigate } from "react-router-dom"
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined"
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined"
import { Lesson } from "../types/server/class/Course/Lesson"

export const useGetPaths = (user?: User | undefined, course?: Course | undefined, lesson?: Lesson | undefined) => {
    const navigate = useNavigate()
    const creator = user?.creator

    const coursePaths: Paths = useMemo(
        () =>
            user && creator && course
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

    const allPaths: Paths = useMemo(
        () =>
            user && creator && lesson && course
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

    const messagePaths: Paths = useMemo(
        () =>
            course
                ? [
                      {
                          link: `/grupos?id=${course.id}`,
                          title: "Ver mensagem",
                          icon: <VisibilityOutlined />,
                          id: course.id,
                          onClick: () => navigate(`/grupos?id=${course.id}`),
                      },
                      {
                          link: `/grupos?id=${course.id}`,
                          title: "Ver Chat",
                          icon: <VisibilityOutlined />,
                          id: course.id,
                          onClick: () => navigate(`/grupos?id=${course.id}`),
                      },
                  ]
                : [],
        [user]
    )

    return { coursePaths, allPaths, messagePaths }
}
