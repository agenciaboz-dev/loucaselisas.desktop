import React, { useState } from "react"
import { Box, Button, Paper } from "@mui/material"
import { Form } from "../login/Form"
import { AproveModal } from "./AproveModal"
import { useFormik } from "formik"
import { ReproveModal } from "./ReproveModal"
import { Course, PartialCourse } from "../../types/server/class/Course"
import { StatusForm } from "../../types/statusForm"

interface FormAproveProps {
    options?: boolean
    name: string
    type: "course" | "lesson"
    id: string
}

export const FormAprove: React.FC<FormAproveProps> = ({ options = false, name, type, id }) => {
    const [loading, setLoading] = useState(false)

    const [openAproveModal, setOpenAproveModal] = useState(false)
    const [openReproveModal, setOpenReproveModal] = useState(false)

    const handleOpenAproveModal = () => setOpenAproveModal(!openAproveModal)
    const handleopenReproveModal = () => setOpenReproveModal(!openReproveModal)

    const aproveFormik = useFormik<StatusForm>({ initialValues: { id: id, status: "active" }, onSubmit: async (values) => {} })
    const reproveFormik = useFormik<StatusForm>({
        initialValues: { id: id, status: "declined", declined_reason: "" },
        onSubmit: async (values) => {},
    })

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
                        <AproveModal name={name} type={type} openAproveModal={openAproveModal} handleOpenAproveModal={handleOpenAproveModal} />
                        <ReproveModal name={name} type={type} openReproveModal={openReproveModal} handleOpenReproveModal={handleopenReproveModal} />
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}
