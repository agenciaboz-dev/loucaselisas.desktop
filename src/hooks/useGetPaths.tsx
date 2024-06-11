import { useMemo } from "react"
import { User } from "../types/server/class"
import { Paths } from "../types/paths"
import { slugify } from "../tools/urlMask"
import { Course } from "../types/server/class/Course"
import { useNavigate } from "react-router-dom"
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined"
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { Lesson } from "../types/server/class/Course/Lesson"
import { Message } from "../types/server/class/Chat/Message"
import { api } from "../api/api"

type Data = { messages: Message[]; chat_id: string }

interface Options {
    user?: User | undefined
    course?: Course | undefined
    lesson?: Lesson | undefined
    message?: Message
    onDelete?: (message: Message) => void
}

export const useGetPaths = (options: Options) => {
    const { course, lesson, user, message, onDelete } = options

    // console.log(lesson)

    const navigate = useNavigate()
    const creator = user?.creator
    const messageID = message?.id

    const deleteMessage = async () => {
        if (message) {
            const data: Data = { messages: [message], chat_id: message.chat_id }

            // console.log(data)

            try {
                const response = await api.delete("/chat/delete_message", { data })
                const thisMessage = response.data[0]
                console.log(thisMessage)
                {
                    onDelete && onDelete(thisMessage)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    // const reproveCourse = async () => {
    //     if (course {

    //     })
    // }

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
                          link: `/grupos?id=${course.id}&messageId=${message?.id}`,
                          title: "Ver mensagem",
                          icon: <VisibilityOutlined />,
                          id: course.id,
                          onClick: () => navigate(`/grupos?id=${course.id}&messageId=${message?.id}`),
                      },
                      {
                          link: `/grupos?id=${course.id}`,
                          title: "Ver Chat",
                          icon: <VisibilityOutlined />,
                          id: course.id,
                          onClick: () => navigate(`/grupos?id=${course.id}`),
                      },
                      {
                          link: messageID || "",
                          title: "Deletar Mensagem",
                          icon: <DeleteOutlineIcon />,
                          id: messageID,
                          onClick: deleteMessage,
                      },
                  ]
                : [],
        [user]
    )

    return { coursePaths, allPaths, messagePaths }
}
