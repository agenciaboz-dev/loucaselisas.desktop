import React, { useState } from "react"
import { Box, Button, Modal, Paper, Typography } from "@mui/material"
import { Course } from "../../types/server/class/Course"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { Form } from "../login/Form"
import { AproveModal } from "./AproveModal"

interface FormAproveProps {
    options?: boolean
    name: string
    type: "course" | "lesson"
}

export const FormAprove: React.FC<FormAproveProps> = ({ options = false, name, type }) => {
    const [loading, setLoading] = useState(false)

    const [openAproveModal, setOpenAproveModal] = useState(false)
    const [openReproveModal, setOpenReproveModal] = useState(false)

    const handleOpenAproveModal = () => setOpenAproveModal(!openAproveModal)
    const handleopenReproveModal = () => setOpenReproveModal(!openReproveModal)

    return (
        <Box sx={{}}>
            <Paper sx={{ flex: 1, p: "0.5vw" }}>
                <Form onSubmit={() => {}} sx={{ flexDirection: "column", flex: 1, gap: "1vw" }}>
                    {options && <Box></Box>}

                    <Box sx={{ justifyContent: "space-between", gap: "0.5vw" }}>
                        <Button fullWidth variant="outlined" sx={{ borderRadius: "2vw" }}>
                            Reprovar
                        </Button>
                        <Button fullWidth variant="contained" sx={{ borderRadius: "2vw" }} onClick={handleOpenAproveModal}>
                            Aprovar
                        </Button>
                        <AproveModal name={name} type={type} openAproveModal={openAproveModal} handleOpenAproveModal={handleOpenAproveModal} />
                    </Box>
                </Form>
            </Paper>
        </Box>
    )
}
