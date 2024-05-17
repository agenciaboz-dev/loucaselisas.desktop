import React, { useEffect, useState } from "react"
import { Box, Button, Divider, Paper, Switch, Typography } from "@mui/material"
import { useFormik } from "formik"
import { StatusForm } from "../../types/statusForm"
import { api } from "../../api/api"
import { AproveModal } from "./AproveModal"
import { ReproveModal } from "./ReproveModal"
import { Status } from "../../types/server/class/Course"
import { formatStatus } from "../../tools/formatStatus"
import { Lesson } from "../../types/server/class/Course/Lesson"

interface FormAproveLessonProps {
    lesson: Lesson
    id: string
    name: string
    type: "course" | "lesson"
    status: Status
}

export const FormAproveLesson: React.FC<FormAproveLessonProps> = ({ lesson, id, name, type, status }) => {
    const [loading, setLoading] = useState(false)

    const [currentLesson, setCurrentLesson] = useState<Lesson>(lesson)
    const [openAproveModal, setopenAproveModal] = useState(false)
    const [openReproveModal, setOpenReproveModal] = useState(false)

    const handleOpenAproveModal = () => setopenAproveModal(!openAproveModal)
    const handleopenReproveModal = () => setOpenReproveModal(!openReproveModal)

    const FormatedStatus = formatStatus(currentLesson.status)

    const formik = useFormik<StatusForm>({
        initialValues: {
            id: id,
            status: status,
        },
        onSubmit: async (values) => {
            if (loading) return
            setLoading(true)

            try {
                const response = await api.patch("/lesson", values)
                console.log(response.data)
                setCurrentLesson(response.data)
                handleOpenAproveModal()
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 300)
            }
        },
        enableReinitialize: true,
    })

    const onReprove = async (reason: string) => {
        const data: StatusForm = { id: id, status: "declined", declined_reason: reason }
        if (loading) return
        setLoading(true)

        try {
            const response = await api.patch("/lesson", data)
            setCurrentLesson(response.data)
            console.log(response.data)
            handleopenReproveModal()
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    }

    const onDisabled = async () => {
        const data: StatusForm = { id: id, status: "pending" }
        if (loading) return
        setLoading(true)

        try {
            const response = await api.patch("/lesson", data)
            setCurrentLesson(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    }

    useEffect(() => {
        setCurrentLesson(lesson)
    }, [lesson])

    return (
        <Box sx={{}}>
            <Paper sx={{ flex: 1, p: "0.7vw", borderRadius: "1vw" }}>
                <Box sx={{ flexDirection: "column", flex: 1, gap: "1vw" }}>
                    <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ alignItems: "center", gap: "0.3vw" }}>
                            <FormatedStatus.Icon />
                            <Typography>Status do conteúdo: {FormatedStatus.text} </Typography>
                        </Box>

                        {currentLesson.status !== "declined" && <Switch checked={currentLesson.status === "active"} onChange={() => onDisabled()} />}
                    </Box>
                    {currentLesson.status == "pending" && <Divider />}
                    {currentLesson.status === "pending" && (
                        <Box sx={{ justifyContent: "space-between", gap: "0.5vw" }}>
                            <>
                                <Button fullWidth variant="outlined" sx={{ borderRadius: "2vw" }} onClick={handleopenReproveModal}>
                                    Reprovar
                                </Button>
                                <Button fullWidth variant="contained" sx={{ borderRadius: "2vw" }} onClick={handleOpenAproveModal}>
                                    Aprovar
                                </Button>
                            </>

                            <AproveModal
                                name={name}
                                type={type}
                                openAproveModal={openAproveModal}
                                handleOpenAproveModal={handleOpenAproveModal}
                                onConfirm={formik.handleSubmit}
                            />
                            <ReproveModal
                                name={name}
                                type={type}
                                openReproveModal={openReproveModal}
                                handleOpenReproveModal={handleopenReproveModal}
                                onConfirm={onReprove}
                            />
                        </Box>
                    )}
                </Box>
            </Paper>
        </Box>
    )
}
