import React, { useEffect, useRef, useState } from "react"
import { Box, Divider, Grid, Paper, Skeleton } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { Course } from "../types/server/class/Course"
import { useGetCourses } from "../hooks/useGetCourses"
import { SearchBar } from "../components/header/SearchBar"
import { useDraggable } from "react-use-draggable-scroll"
import { GroupCard } from "../components/groups/GroupCard"
import { api } from "../api/api"
import { Message as MessageYup } from "yup"
import { Chat } from "./Chat"
import { Socket, io } from "socket.io-client"
import { url } from "../api/backend"
import { Message, MessageForm } from "../types/server/class/Chat/Message"
import { Chat as ChatClass } from "../types/server/class/Chat/Chat"
import { useUser } from "../hooks/useUser"

interface GroupsProps {}
interface LastMessages {
    [key: string]: any
}

export const Groups: React.FC<GroupsProps> = ({}) => {
    const { user } = useUser()

    const [active, setActive] = useState("popular")
    const { getCourses, loading } = useGetCourses()
    const [courses, setCourses] = useState<Course[]>([])
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)
    const skeletonCourse: string[] = new Array(20).fill(`course`)
    const [skeletonLoading, setSkeletonLoading] = useState<boolean>(loading)

    const [expandedChat, setExpanded] = useState<Boolean>(false)
    const [course, setCourse] = useState<Course | null>(null)

    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })
    const fetchCourses = async () => {
        const courses = await getCourses()
        if (!courses) {
            console.log("erro ao carregar cursos")
            return
        }

        await fetchMessages(courses)
        setTimeout(() => {
            setCourses(courses)
        }, 300)
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    useEffect(() => {
        setSkeletonLoading(loading)
    }, [loading])

    useEffect(() => {
        setFilteredCourses(courses)
        const currentFilter = active
        setActive(currentFilter)
    }, [courses])

    const [lastMessages, setLastMessages] = useState<{ [key: string]: any | null }>({})

    const fetchMessages = async (courses: Course[]) => {
        try {
            const messages: LastMessages = {}
            courses.forEach(async (course) => {
                let message: Message | null = null
                const response = await api.get("/course/last_message", { params: { course_id: course.id } })
                if (response.data) {
                    message = response.data
                }
                messages[course.id] = message
            })
            setLastMessages(messages)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearch = (value: string) => {
        const lowerCaseValue = value.toLowerCase()
        setFilteredCourses(
            courses.filter((course) => {
                const courseMatches =
                    course.name.toLowerCase().includes(lowerCaseValue) ||
                    course.owner.user.username?.toLowerCase().includes(lowerCaseValue)

                const messageMatches =
                    (lastMessages[course.id] && lastMessages[course.id]?.text.toLowerCase().includes(lowerCaseValue)) ||
                    lastMessages[course.id]?.user.name.toLowerCase().includes(lowerCaseValue) ||
                    lastMessages[course.id]?.user.username.toLowerCase().includes(lowerCaseValue)

                return courseMatches || messageMatches
            })
        )
    }

    useEffect(() => {
        console.log(lastMessages)
    }, [lastMessages])

    useEffect(() => {
        setFilteredCourses(courses)
    }, [courses])

    useEffect(() => {
        console.log(expandedChat)
    }, [expandedChat])

    // const [chatCourse, setChatCourse] = useState<ChatClass | undefined>(undefined)
    // const [messages, setMessages] = useState<Message[]>([])
    // const [refreshing, setRefreshing] = useState(true)

    // const socket = useRef<Socket | null>(null)

    // const [text, setText] = useState("")
    // const listMessages = messages.sort((a, b) => Number(a.datetime) - Number(b.datetime))

    // const onSubmitText = () => {
    //     if (!chatCourse || !socket.current || !user || !text) return
    //     if (chatCourse) {
    //         const data: MessageForm = {
    //             chat_id: chatCourse.id,
    //             user_id: user.id,
    //             text,
    //             video_id: null,
    //             video_timestamp: null,
    //         }

    //         socket.current?.emit("chat:message", data)
    //         setText("")
    //     }
    // }

    // const addMessage = (message: Message) => {
    //     setMessages((messages) => [...messages, message])
    // }

    // const listenToEvents = () => {
    //     if (!socket.current) return

    //     socket.current.on("connect", () => {
    //         console.log("socketio conected")
    //     })
    //     socket.current.on("disconnect", () => {
    //         console.log("socketio disconnected")
    //     })

    //     socket.current.on("chat:join", (data: Message[]) => {
    //         console.log("joined chat!")
    //         console.log({ OQUECHEGA: data })
    //         setMessages(data)
    //         setTimeout(() => {
    //             setRefreshing(false)
    //         }, 2000)
    //     })

    //     socket.current.on("chat:message", (message: Message) => {
    //         addMessage(message)
    //     })

    //     socket.current.on("chat:message:success", (message: Message) => {
    //         addMessage(message)
    //     })
    // }

    // const unListenEvents = () => {
    //     if (!socket.current) return

    //     socket.current.off("chat:join")
    //     socket.current.off("chat:message")
    //     socket.current.off("chat:message:success")
    // }

    // const socketConnect = () => {
    //     socket.current = io(`ws${url}`)
    //     listenToEvents()

    //     console.log({ AQUIIIIII: chatCourse })
    //     if (chatCourse) socket.current.emit("chat:join", chatCourse.id)
    // }

    // useEffect(() => {
    //     if (course) setChatCourse(course.chat as ChatClass | undefined)
    //     // useCallback(() => {

    //     socketConnect()
    //     return () => {
    //         unListenEvents()
    //         socket.current?.disconnect()
    //     }
    //     // }, [])
    // }, [course])

    return (
        <Box sx={{ width: 1, gap: "0.95vw", height: 1 }}>
            <Box sx={{ width: expandedChat ? "32.55%" : "100%", flexDirection: "column", height: 1 }}>
                <HeaderInfo title="Grupos" refreshCallback={() => fetchCourses()} loading={loading} />
                <Box
                    sx={{
                        flexDirection: "column",
                        height: "72.8vh",
                        width: 1,
                        gap: "0.8vw",
                        pt: "0.2vw",
                    }}
                >
                    <SearchBar handleSearch={(value) => handleSearch(value)} key={"name"} />

                    <Box
                        ref={ref}
                        {...events}
                        sx={{
                            height: "66.8vh",
                            pt: "0.2vw",
                            overflowY: "scroll",
                            gap: "0.5vw",
                            pr: "0.7vw",
                            // mr: "1.8vw",
                            flexDirection: "column",
                        }}
                    >
                        <Grid container columns={expandedChat ? 1 : 3} spacing={2} sx={{ pb: "1vw" }}>
                            {skeletonLoading
                                ? skeletonCourse.map((_, index) => (
                                      <Grid item xs={1} key={index}>
                                          <Paper
                                              sx={{
                                                  flexDirection: "column",
                                                  p: "0.7vw",
                                                  gap: "0.5vw",
                                                  borderRadius: "1vw",
                                                  flex: 1,
                                              }}
                                          >
                                              <Box sx={{ width: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                                  <Box
                                                      sx={{
                                                          flexDirection: "column",
                                                          justifyContent: "space-between",
                                                          gap: "0.3vw",
                                                      }}
                                                  >
                                                      <Skeleton
                                                          variant="rounded"
                                                          animation="wave"
                                                          sx={{ width: "13vw", height: "1.2vw", maxWidth: "16vw" }}
                                                      />
                                                      <Skeleton
                                                          variant="rounded"
                                                          animation="wave"
                                                          sx={{ width: "18vw", height: "0.8vw", maxWidth: "16vw" }}
                                                      />
                                                  </Box>
                                                  <Skeleton
                                                      variant="rounded"
                                                      animation="wave"
                                                      sx={{ width: "3vw", height: "3vw" }}
                                                  />
                                              </Box>
                                              <Divider />
                                              <Box
                                                  sx={{
                                                      width: 1,
                                                      minHeight: "5vw",
                                                      flexDirection: "row",
                                                      gap: "0.5vw",
                                                      alignItems: "center",
                                                  }}
                                              >
                                                  <Skeleton variant="circular" sx={{ width: "3vw", height: "3vw" }} />
                                                  <Box sx={{ width: 0.75, flexDirection: "column", gap: "0.4vw" }}>
                                                      <Skeleton
                                                          variant="rounded"
                                                          animation="wave"
                                                          sx={{ width: "13vw", height: "1.2vw", maxWidth: "16vw" }}
                                                      />
                                                      <Skeleton
                                                          variant="rounded"
                                                          animation="wave"
                                                          sx={{ width: "16vw", height: "2vw", maxWidth: "16vw" }}
                                                      />
                                                  </Box>
                                              </Box>
                                          </Paper>
                                      </Grid>
                                  ))
                                : filteredCourses.map((course) => (
                                      <GroupCard
                                          setCourse={setCourse}
                                          course={course}
                                          key={course.id}
                                          setExpanded={setExpanded}
                                          expandedChat={expandedChat}
                                      />
                                  ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
            {/* {expandedChat && <Chat setExpanded={setExpanded} course={course} messages={messages} refreshing={refreshing} />} */}
            {expandedChat && <Chat setExpanded={setExpanded} course={course} user={user} />}
        </Box>
    )
}
