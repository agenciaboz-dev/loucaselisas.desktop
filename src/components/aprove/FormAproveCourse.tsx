import React, { useState } from "react"
import { Box, Button, Divider, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { AproveModal } from "./AproveModal"
import { useFormik } from "formik"
import { ReproveModal } from "./ReproveModal"
import { StatusForm } from "../../types/statusForm"
import { api } from "../../api/api"
import { Status } from "../../types/server/class/Course"
import { formatStatus } from "../../tools/formatStatus"

interface FormAproveCourseProps {
    options?: boolean
    name: string
    type: "course" | "lesson"
    id: string
    price: number
    status: Status
    onChangeStatus: () => Promise<void>
}

export const FormAproveCourse: React.FC<FormAproveCourseProps> = ({ options = true, name, type, id, price, status, onChangeStatus }) => {
    const [loading, setLoading] = useState(false)

    const [openAproveModal, setOpenAproveModal] = useState(false)
    const [openReproveModal, setOpenReproveModal] = useState(false)

    const handleOpenAproveModal = () => setOpenAproveModal(!openAproveModal)
    const handleopenReproveModal = () => setOpenReproveModal(!openReproveModal)

    const FormatedStatus = formatStatus(status)

    const selectOptions = [
        {
            value: "value1",
            label: "label1",
        },
        {
            value: "value2",
            label: "label2",
        },
        {
            value: "value3",
            label: "label3",
        },
        {
            value: "value4",
            label: "label4",
        },
    ]

    const formik = useFormik<StatusForm>({
        initialValues: { id: id, status: "active", price: price },
        onSubmit: async (values) => {
            if (loading) return
            setLoading(true)

            try {
                const response = await api.patch("/course", values)
                setOpenAproveModal(!openAproveModal)
                onChangeStatus()
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
            onChangeStatus()
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
            <Paper sx={{ flex: 1, p: "0.7vw", borderRadius: "1vw" }}>
                <Box sx={{ flexDirection: "column", flex: 1, gap: "1vw" }}>
                    <Box sx={{ alignItems: "center", gap: "0.2vw" }}>
                        <FormatedStatus.Icon />
                        <Typography>Status do conteúdo: {FormatedStatus.text} </Typography>
                    </Box>
                    <Divider />
                    {options && (
                        <Box sx={{ justifyContent: "space-between", gap: "1vw" }}>
                            <Box sx={{ flexDirection: "column", flex: 1 }}>
                                <Box sx={{ justifyContent: "space-between", flex: 1 }}>
                                    <Typography variant="body1" component="p" sx={{ fontSize: "1.1rem" }}>
                                        Tipo de Plano
                                    </Typography>
                                    <Typography sx={{ color: "secondary.contrastText" }}>Sugerido: Valor a parte </Typography>
                                </Box>
                                <TextField select placeholder="plano" SelectProps={{ MenuProps: { MenuListProps: { sx: { width: 1 } } } }}>
                                    {selectOptions.map((option) => (
                                        <MenuItem key={option.value} defaultValue={option.value[0]} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box sx={{ flexDirection: "column", flex: 1 }}>
                                <Box sx={{ justifyContent: "space-between" }}>
                                    <Typography variant="body1" component="p" sx={{ fontSize: "1.1rem" }}>
                                        Valor
                                    </Typography>
                                </Box>
                                <TextField value={formik.values.price} onChange={formik.handleChange} />
                            </Box>
                        </Box>
                    )}

                    <TextField
                        select
                        helperText="Selecione o tipo de usuário que irá ter acesso ao curso"
                        label="Selecione o tipo de usuário"
                        SelectProps={{ MenuProps: { MenuListProps: { sx: { width: 1 } } } }}
                    >
                        <MenuItem>teste</MenuItem>
                    </TextField>

                    <Box sx={{ justifyContent: "space-between", gap: "0.5vw" }}>
                        {status === "pending" && (
                            <>
                                <Button fullWidth variant="outlined" sx={{ borderRadius: "2vw" }} onClick={handleopenReproveModal}>
                                    Reprovar
                                </Button>
                                <Button fullWidth variant="contained" sx={{ borderRadius: "2vw" }} onClick={handleOpenAproveModal}>
                                    Aprovar
                                </Button>
                            </>
                        )}
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
                </Box>
            </Paper>
        </Box>
    )
}
