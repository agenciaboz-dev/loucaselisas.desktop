import React, { useEffect, useRef, useState } from "react"
import { Box, Divider, Grid, Paper, Skeleton } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { Course } from "../types/server/class/Course"
import { useGetCourses } from "../hooks/useGetCourses"
import { SearchBar } from "../components/header/SearchBar"
import { useDraggable } from "react-use-draggable-scroll"
import { GroupCard } from "../components/groups/GroupCard"
import { api } from "../api/api"
import { Chat } from "./Chat"
import { Message } from "../types/server/class/Chat/Message"
import { useUser } from "../hooks/useUser"
import { useSearchParams } from "react-router-dom"

interface GroupsProps {}
interface LastMessages {
    [key: string]: any
}

export const Groups: React.FC<GroupsProps> = ({}) => {
    const { user } = useUser()
    const [search] = useSearchParams()
    const [courseId, setCourseId] = useState(search.get("id"))

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

    const fetchCourse = async () => {
        try {
            const response = await api.get("/course", { params: { course_id: courseId } })
            // console.log({ Resposta: response.data })
            setCourse(response.data)
            setExpanded(true)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCourses = async () => {
        const courses = await getCourses()
        if (!courses) {
            console.log("erro ao carregar cursos")
            return
        }

        if (courseId) {
            fetchCourse()
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

    const [lastMessages, setLastMessages] = useState<{ [key: string]: Message | null }>({})

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
                    course.name.toLowerCase().includes(lowerCaseValue) || course.owner.user.username?.toLowerCase().includes(lowerCaseValue)

                const messageMatches =
                    (lastMessages[course.id] && lastMessages[course.id]?.text.toLowerCase().includes(lowerCaseValue)) ||
                    lastMessages[course.id]?.user?.name.toLowerCase().includes(lowerCaseValue) ||
                    lastMessages[course.id]?.user?.username.toLowerCase().includes(lowerCaseValue)

                return courseMatches || messageMatches
            })
        )
    }

    // useEffect(() => {
    //     console.log(lastMessages)
    // }, [lastMessages])

    useEffect(() => {
        setFilteredCourses(courses)
    }, [courses])

    // useEffect(() => {
    //     console.log(expandedChat)
    // }, [expandedChat])

    // useEffect(() => {
    //     fetchCourse()
    // }, [courseId])

    return (
        <Box sx={{ width: 1, height: 1 }}>
            <Box sx={{ flex: 1, flexDirection: "column", height: 1 }}>
                <HeaderInfo title="Grupos" refreshCallback={() => fetchCourses()} loading={loading} />
                <Box
                    sx={{
                        gap: "0.5vw",
                        flex: 1,
                        height: 1,
                    }}
                >
                    <Box
                        sx={{
                            flexDirection: "column",
                            height: "72.8vh",
                            flex: expandedChat ? 0.33 : 1,
                            // width: expandedChat ? 0.33 : 1,
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
                                                              gap: "0.5vw",
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
                                                      <Skeleton variant="rounded" animation="wave" sx={{ width: "3vw", height: "3vw" }} />
                                                  </Box>
                                                  <Divider />
                                                  <Box
                                                      sx={{
                                                          width: 1,
                                                          flexDirection: "row",
                                                          gap: "0.5vw",
                                                          alignItems: "center",
                                                          justifyContent: "space-between",
                                                      }}
                                                  >
                                                      <Box
                                                          sx={{
                                                              flexDirection: "row",
                                                              alignItems: "center",
                                                              minHeight: "4.5vw",
                                                              gap: "0.5vw",
                                                              width: "100%",
                                                          }}
                                                      >
                                                          <Skeleton variant="circular" sx={{ width: "3vw", height: "3vw" }} />
                                                          <Box sx={{ flexDirection: "column", gap: "0.75vw" }}>
                                                              <Skeleton variant="rounded" animation="wave" sx={{ width: "9vw", height: "1.5vw" }} />
                                                              <Skeleton variant="rounded" animation="wave" sx={{ width: "12vw", height: "1.2vw" }} />
                                                          </Box>
                                                          <Box
                                                              sx={{
                                                                  width: "25%",
                                                                  flexDirection: "column",
                                                                  gap: "0.75vw",
                                                                  marginLeft: "auto",
                                                                  alignItems: "flex-end",
                                                              }}
                                                          >
                                                              <Skeleton
                                                                  variant="rounded"
                                                                  animation="wave"
                                                                  sx={{ width: "5vw", height: "1.2vw", maxWidth: "6vw" }}
                                                              />
                                                              <Skeleton
                                                                  variant="rounded"
                                                                  animation="wave"
                                                                  sx={{ width: "3vw", height: "1.2vw", maxWidth: "3vw" }}
                                                              />
                                                          </Box>
                                                      </Box>
                                                  </Box>
                                              </Paper>
                                          </Grid>
                                      ))
                                    : filteredCourses
                                          .sort((a, b) => Number(lastMessages[b.id]?.datetime) - Number(lastMessages[a.id]?.datetime))
                                          .map((course) => (
                                              <GroupCard
                                                  setCourse={setCourse}
                                                  setCourseId={setCourseId}
                                                  course={course}
                                                  key={course.id}
                                                  setExpanded={setExpanded}
                                                  expandedChat={expandedChat}
                                              />
                                          ))}
                            </Grid>
                        </Box>
                    </Box>
                    {user && expandedChat && <Chat setExpanded={setExpanded} course={course} user={user} />}
                </Box>
            </Box>
        </Box>
    )
}
