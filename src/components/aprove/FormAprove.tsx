import React, { useState } from "react"
import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { AproveModal } from "./AproveModal"
import { useFormik } from "formik"
import { ReproveModal } from "./ReproveModal"
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
            <Paper sx={{ flex: 1, p: "0.7vw", borderRadius: "1vw" }}>
                <Box sx={{ flexDirection: "column", flex: 1, gap: "1vw" }}>
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
                                    <Typography sx={{ color: "secondary.contrastText" }}>Sugerido: R$ {formik.initialValues.price} </Typography>
                                </Box>
                                <TextField value={formik.values.price} onChange={formik.handleChange} />
                            </Box>
                        </Box>
                    )}

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
