import React, { useState } from "react"
import { Box, Button, Divider, Paper, Switch, Typography } from "@mui/material"
import { useFormik } from "formik"
import { StatusForm } from "../../types/statusForm"
import { api } from "../../api/api"
import { AproveModal } from "./AproveModal"
import { ReproveModal } from "./ReproveModal"
import { Status } from "../../types/server/class/Course"
import { formatStatus } from "../../tools/formatStatus"

interface FormAproveLessonProps {
    id: string
    name: string
    type: "course" | "lesson"
    status: Status
    onChangeStatus: () => Promise<void>
}

export const FormAproveLesson: React.FC<FormAproveLessonProps> = ({ id, name, type, status, onChangeStatus }) => {
    const [loading, setLoading] = useState(false)

    const [openAproveModal, setopenAproveModal] = useState(false)
    const [openReproveModal, setOpenReproveModal] = useState(false)

    const handleOpenAproveModal = () => setopenAproveModal(!openAproveModal)
    const handleopenReproveModal = () => setOpenReproveModal(!openReproveModal)

    const FormatedStatus = formatStatus(status)

    const formik = useFormik<StatusForm>({
        initialValues: {
            id: id,
            status: "active",
        },
        onSubmit: async (values) => {
            if (loading) return
            setLoading(true)

            try {
                const response = await api.patch("/lesson", values)
                setopenAproveModal(!setopenAproveModal)
                onChangeStatus()
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 300)
            }
        },
    })

    const onReprove = async (reason: string) => {
        const data: StatusForm = { id: id, status: "declined", declined_reason: reason }
        if (loading) return
        setLoading(true)

        try {
            const response = await api.patch("/lesson", data)
            setOpenReproveModal(!openReproveModal)
            onChangeStatus()
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
            onChangeStatus()
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    }

    return (
        <Box sx={{}}>
            <Paper sx={{ flex: 1, p: "0.7vw", borderRadius: "1vw" }}>
                <Box sx={{ flexDirection: "column", flex: 1, gap: "1vw" }}>
                    <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ alignItems: "center", gap: "0.3vw" }}>
                            <FormatedStatus.Icon />
                            <Typography>Status do conteúdo: {FormatedStatus.text} </Typography>
                        </Box>

                        {status !== "declined" && <Switch checked={status === "active"} onChange={() => onDisabled()} />}
                    </Box>
                    {status == "pending" && <Divider />}
                    {status === "pending" && (
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
