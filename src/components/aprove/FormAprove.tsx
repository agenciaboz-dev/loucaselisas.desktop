import React, { useState } from "react"
import { Box, Paper } from "@mui/material"
import { Course } from "../../types/server/class/Course"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { Form } from "../login/Form"

interface FormAproveProps {
    options: boolean
}

export const FormAprove: React.FC<FormAproveProps> = ({ options = false }) => {
    const [loading, setLoading] = useState(false)

    return (
        <Box sx={{}}>
            <Paper>
                <Form onSubmit={() => {}} sx={{ flexDirection: "column" }}>
                    {options && <Box></Box>}
                    <Box></Box>
                </Form>
            </Paper>
        </Box>
    )
}
