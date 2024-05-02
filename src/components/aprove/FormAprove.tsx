import React, { useState } from "react"
import { Box, Button, Paper } from "@mui/material"
import { Form } from "../login/Form"
import { AproveModal } from "./AproveModal"
import { useFormik } from "formik"
import { ReproveModal } from "./ReproveModal"
import { Course, PartialCourse } from "../../types/server/class/Course"
import { StatusForm } from "../../types/statusForm"
import { api } from "../../api/api"

interface FormAproveProps {
    options?: boolean
    name: string
    type: "course" | "lesson"
    id: string
    price: number
}

export const FormAprove: React.FC<FormAproveProps> = ({ options = false, name, type, id, price }) => {
    const [loading, setLoading] = useState(false)

    const [openAproveModal, setOpenAproveModal] = useState(false)
    const [openReproveModal, setOpenReproveModal] = useState(false)

    const handleOpenAproveModal = () => setOpenAproveModal(!openAproveModal)
    const handleopenReproveModal = () => setOpenReproveModal(!openReproveModal)

    const aproveFormik = useFormik<StatusForm>({
        initialValues: { id: id, status: "active", price: price },
        onSubmit: async (values) => {
            if (loading) return
            setLoading(true)

            try {
                const response = await api.patch("/course", values)
                setOpenAproveModal(!openAproveModal)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
        },
    })

    const onReprove = async (reason: string) => {
        const data: StatusForm = { id: id, status: "declined", declined_reason: reason, price: price }
        if (loading) return
        setLoading(true)

        try {
            const response = await api.patch("/course", data)
            setOpenReproveModal(!openReproveModal)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    return (
        <Box sx={{}}>
            <Paper sx={{ flex: 1, p: "0.5vw" }}>
                <Box sx={{ flexDirection: "column", flex: 1, gap: "1vw" }}>
                    {options && <Box></Box>}

                    <Box sx={{ justifyContent: "space-between", gap: "0.5vw" }}>
                        <Button fullWidth variant="outlined" sx={{ borderRadius: "2vw" }} onClick={handleopenReproveModal}>
                            Reprovar
                        </Button>
                        <Button fullWidth variant="contained" sx={{ borderRadius: "2vw" }} onClick={handleOpenAproveModal}>
                            Aprovar
                        </Button>
                        <AproveModal
                            name={name}
                            type={type}
                            openAproveModal={openAproveModal}
                            handleOpenAproveModal={handleOpenAproveModal}
                            onConfirm={aproveFormik.handleSubmit}
                        />
                        <ReproveModal
                            name={name}
                            type={type}
                            openReproveModal={openReproveModal}
                            handleOpenReproveModal={handleopenReproveModal}
                            onConfirm={onReprove}
                        />
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}
