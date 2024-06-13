import React, { useEffect, useState } from "react"
import { Avatar, Box, Divider, LinearProgress, MenuItem, Switch, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { Course, Status } from "../../types/server/class/Course"
import { StatusForm } from "../../types/statusForm"
import { api } from "../../api/api"
import { formatStatus } from "../../tools/formatStatus"
import placeholders from "../../tools/placeholders"
import { useTimeInstant } from "../../hooks/useTimeInstant"
import { useUser } from "../../hooks/useUser"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

interface DataCardProps {
    lesson: Lesson
    link: string
    refreshStatus: () => Promise<void>
    // refreshLesson?: () => Promise<void>
    routerParam?: { lesson: Lesson; course: Course }
}

export const DataCard: React.FC<DataCardProps> = ({ lesson, link, refreshStatus, routerParam }) => {
    const formattedDuration = dayjs.duration(Number(lesson.media.duration)).format("mm:ss")
    const navigate = useNavigate()
    const [thisTimeInstant, setThisTimeInstant] = useState<number>()
    const { user } = useUser()
    const progress = thisTimeInstant && (thisTimeInstant / lesson.media.duration) * 100000
    // console.log({ PROGRESS: progress })
    const [loading, setLoading] = useState(false)
    const [thisLesson, setThisLesson] = useState(lesson)
    const FormatedStatus = formatStatus(thisLesson.status)

    const onChangeStatus = async (checked: boolean) => {
        const data: StatusForm = { id: lesson.id, status: checked ? "active" : "pending" }
        if (loading) return
        setLoading(true)

        try {
            const response = await api.patch("/lesson", data)
            setThisLesson(response.data)
            refreshStatus()
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    const fetchWatchedTime = async () => {
        // if (timeInstant) return

        try {
            const response = await api.get("/user/lesson_watchtime", { params: { user_id: user?.id, lesson_id: lesson?.id } })
            const data = response.data
            // console.log({ fetchResponse: data })
            setThisTimeInstant(Number(data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchWatchedTime()
    }, [lesson])

    return (
        <Box sx={{ flexDirection: "column", width: "29.3vw" }}>
            <Box sx={{ justifyContent: "space-between" }}>
                <Box sx={{ alignItems: "center", gap: "0.3vw" }}>
                    <FormatedStatus.Icon />
                    <Typography>Status do conteúdo: {FormatedStatus.text} </Typography>
                </Box>

                {thisLesson.status !== "declined" && (
                    <Switch checked={thisLesson.status === "active"} onChange={(_, checked) => onChangeStatus(checked)} />
                )}
                {/* {thisLesson.status && <Switch checked={thisLesson.status === "active"} onChange={(_, checked) => onChangeStatus(checked)} />} */}
            </Box>
            <MenuItem
                sx={{ flex: 1, maxHeight: "5vw", padding: 0, flexDirection: "column" }}
                onClick={() => {
                    navigate(link, { state: { data: routerParam } })
                    // console.log(link, { state: { data: routerParam } })
                }}
            >
                <Box sx={{ gap: "1vw" }}>
                    <Avatar
                        variant="rounded"
                        src={thisLesson.thumb || placeholders.square}
                        alt="Capa do curso"
                        sx={{ width: "5vw", height: "5vw", objectFit: "cover", borderRadius: "1vw" }}
                    />
                    <Box sx={{ justifyContent: "space-between", flexDirection: "column" }}>
                        <Typography variant="subtitle1" component="h3" sx={{ fontSize: "1rem" }}>
                            {thisLesson.name}
                        </Typography>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                width: "22.7vw",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "normal",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {thisLesson.info}
                        </Typography>
                        {thisLesson.media.type === "video" && (
                            <Box sx={{ gap: "1vw", alignItems: "center" }}>
                                <LinearProgress variant="determinate" value={progress || 0} sx={{ flex: 1 }} />
                                <Typography variant="body2" component="p" sx={{ fontSize: "0.8rem", alignSelf: "end" }}>
                                    {/* {"59:99"} */}
                                    {formattedDuration}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </MenuItem>
        </Box>
    )
}
