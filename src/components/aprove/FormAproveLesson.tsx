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
    onUpdate: (lesson: Lesson) => void
}

export const FormAproveLesson: React.FC<FormAproveLessonProps> = ({ lesson, id, name, type, status, onUpdate }) => {
    const [loading, setLoading] = useState(false)

    const [currentLesson, setCurrentLesson] = useState<Lesson>(lesson)
    const [openAproveModal, setOpenAproveModal] = useState(false)
    const [openReproveModal, setOpenReproveModal] = useState(false)
    const FormatedStatus = formatStatus(currentLesson.status)

    const formik = useFormik<StatusForm>({
        initialValues: {
            id: id,
            status: status,
        },
        onSubmit: async () => {
            if (loading) return
            setLoading(true)

            try {
                console.log({ PrevLesson: currentLesson })
                const response = await api.patch("/lesson", { id: id, status: "active" })
                if (response.data) {
                    setCurrentLesson(response.data)
                    onUpdate(response.data)
                    // setOpenAproveModal(false)
                }
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
            setCurrentLesson((prevLesson) => ({ ...prevLesson, ...response.data }))
            // console.log(response.data)
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
            setCurrentLesson((prevLesson) => ({ ...prevLesson, ...response.data }))

            // formik.resetForm()
            // console.log(response.data)
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

    useEffect(() => {
        if (currentLesson) {
            console.log({ currentLesson: currentLesson })
            formik.resetForm()
            setOpenAproveModal(false)
        }
    }, [currentLesson])

    return (
        <Box sx={{}}>
            <Paper sx={{ flex: 1, p: "0.7vw", borderRadius: "1vw" }}>
                <Box sx={{ flexDirection: "column", flex: 1, gap: "1vw" }}>
                    <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ alignItems: "center", gap: "0.3vw" }}>
                            <FormatedStatus.Icon />
                            <Typography>Status do conteúdo: {FormatedStatus.text} </Typography>
                        </Box>

                        {currentLesson.status !== "declined" && (
                            <Switch
                                checked={currentLesson.status === "active"}
                                disabled={currentLesson.status !== "active"}
                                onChange={() => onDisabled()}
                            />
                        )}
                    </Box>
                    {/* {currentLesson.status == "pending" && } */}
                    {currentLesson.status === "pending" && (
                        <>
                            <Divider />
                            <Box sx={{ justifyContent: "space-between", gap: "0.5vw" }}>
                                <>
                                    <Button fullWidth variant="outlined" sx={{ borderRadius: "2vw" }} onClick={() => setOpenReproveModal(true)}>
                                        Reprovar
                                    </Button>
                                    <Button fullWidth variant="contained" sx={{ borderRadius: "2vw" }} onClick={() => setOpenAproveModal(true)}>
                                        Aprovar
                                    </Button>
                                </>

                                <AproveModal
                                    name={name}
                                    type={type}
                                    openAproveModal={openAproveModal}
                                    onConfirm={formik.handleSubmit}
                                    setOpenAproveModal={setOpenAproveModal}
                                />
                                <ReproveModal
                                    name={name}
                                    type={type}
                                    openReproveModal={openReproveModal}
                                    setOpenReproveModal={setOpenReproveModal}
                                    onConfirm={onReprove}
                                />
                            </Box>
                        </>
                    )}
                </Box>
            </Paper>
        </Box>
    )
}
