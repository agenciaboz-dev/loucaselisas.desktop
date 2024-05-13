import React, { useState } from "react"
import { Avatar, Box, LinearProgress, MenuItem, Switch, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { Course, Status } from "../../types/server/class/Course"
import { StatusForm } from "../../types/statusForm"
import { api } from "../../api/api"
import { formatStatus } from "../../tools/formatStatus"

interface DataCardProps {
    lesson: Lesson
    link: string
    refreshStatus: () => Promise<void>
    // refreshLesson?: () => Promise<void>
    routerParam?: { lesson: Lesson; course: Course }
}

export const DataCard: React.FC<DataCardProps> = ({ lesson, link, refreshStatus, routerParam }) => {
    const navigate = useNavigate()
    const FormatedStatus = formatStatus(lesson.status)

    const [loading, setLoading] = useState(false)

    const onChangeStatus = async (checked: boolean) => {
        const data: StatusForm = { id: lesson.id, status: checked ? "active" : "pending" }
        if (loading) return
        setLoading(true)

        try {
            const response = await api.patch("/lesson", data)
            refreshStatus()
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    return (
        <Box sx={{ flexDirection: "column", width: "29.3vw" }}>
            <Box sx={{ justifyContent: "space-between" }}>
                <Box sx={{ alignItems: "center", gap: "0.3vw" }}>
                    <FormatedStatus.Icon />
                    <Typography>Status do conteúdo: {FormatedStatus.text} </Typography>
                </Box>

                {lesson.status !== "declined" && <Switch checked={lesson.status === "active"} onChange={(_, checked) => onChangeStatus(checked)} />}
            </Box>
            <MenuItem
                sx={{ flex: 1, maxHeight: "5vw", padding: 0, flexDirection: "column" }}
                onClick={() => {
                    // {
                    //     refreshLesson && refreshLesson()
                    // }
                    navigate(link, { state: { data: routerParam } })
                }}
            >
                <Box sx={{ gap: "1vw" }}>
                    <Avatar
                        variant="rounded"
                        src={lesson.thumb || "/placeholders/perfil.webp"}
                        alt="Capa do curso"
                        sx={{ width: "5vw", height: "5vw", objectFit: "cover", borderRadius: "1vw" }}
                    />
                    <Box sx={{ justifyContent: "space-between", flexDirection: "column" }}>
                        <Typography variant="subtitle1" component="h3" sx={{ fontSize: "1rem" }}>
                            {lesson.name}
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
                            {lesson.info}
                        </Typography>
                        <Box sx={{ gap: "1vw", alignItems: "center" }}>
                            <LinearProgress variant="determinate" value={65} sx={{ flex: 1 }} />
                            <Typography variant="body2" component="p" sx={{ fontSize: "0.8rem", alignSelf: "end" }}>
                                {"59:99"}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </MenuItem>
        </Box>
    )
}
