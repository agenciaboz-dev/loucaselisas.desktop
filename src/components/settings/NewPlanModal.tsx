import React from "react"
import { Box, Button, Dialog, MenuItem, TextField, Typography } from "@mui/material"
import { Plan, PlanForm } from "../../types/server/class/Plan"
import MaskedInput from "../masks/MaskedInput"
import { useCurrencyMask } from "burgos-masks"
import { FormikErrors, FormikState, FormikTouched } from "formik"

interface NewPlanModalProps {
    formik: {
        values: PlanForm
        errors: FormikErrors<PlanForm>
        touched: FormikTouched<PlanForm>
        handleChange: (e: React.ChangeEvent<any>) => void
        handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
        resetForm: (nextState?: Partial<FormikState<PlanForm>>) => void
    }

    openPlanModal: boolean
    setOpenPlanModal: React.Dispatch<React.SetStateAction<boolean>>
    plan?: Plan
}

const day = 1000 * 60 * 60 * 24

export const NewPlanModal: React.FC<NewPlanModalProps> = ({ formik, openPlanModal, setOpenPlanModal, plan }) => {
    const currencyMask = useCurrencyMask()

    const planDuration = [
        { type: "diario", timestamp: day.toString() },
        { type: "semanal", timestamp: (day * 7).toString() },
        { type: "mensal", timestamp: (day * 30).toString() },
        { type: "trimestral", timestamp: (day * 90).toString() },
        { type: "semestral", timestamp: (day * 180).toString() },
        { type: "anual", timestamp: (day * 365).toString() },
    ]

    return (
        <Dialog
            open={openPlanModal}
            onClose={() => setOpenPlanModal(false)}
            PaperProps={{ sx: { width: "100%", maxWidth: "fit-content", padding: "1vw", gap: "1vw", borderRadius: "1.2vw" } }}
        >
            <form onSubmit={formik?.handleSubmit}>
                <Box>
                    <Typography variant="body1" component="p" sx={{ fontSize: "1.5rem" }}>
                        {plan ? "Editar Plano" : "Adicionar Plano"}
                    </Typography>
                </Box>
                <Box sx={{ gap: "1vw", width: "100%" }}>
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                            <Typography>Nome do Plano</Typography>
                            <TextField
                                name="name"
                                value={formik?.values.name}
                                onChange={formik.handleChange}
                                sx={{ width: "30vw" }}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Box>
                        <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                            <Typography>Descrição do Plano</Typography>
                            <TextField
                                name="description"
                                value={formik?.values.description}
                                onChange={formik.handleChange}
                                sx={{ width: "30vw" }}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Box>
                        <Box sx={{ gap: "1vw", alignItems: "center" }}>
                            <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                                <Typography>Valor</Typography>
                                <TextField
                                    name="price"
                                    value={formik?.values.price}
                                    onChange={formik.handleChange}
                                    InputProps={{ inputComponent: MaskedInput, inputProps: { mask: currencyMask } }}
                                    sx={{ width: "13.5vw" }}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                            </Box>
                            <Typography variant="body1" component="p" sx={{ mt: "15px" }}>
                                por
                            </Typography>
                            <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                                <Typography>Periodo</Typography>
                                <TextField
                                    select
                                    name="duration"
                                    value={formik?.values.duration}
                                    onChange={formik.handleChange}
                                    sx={{ width: "13.5vw" }}
                                    error={formik.touched.duration && Boolean(formik.errors.duration)}
                                    helperText={formik.touched.duration && formik.errors.duration}
                                >
                                    {planDuration.map((plan) => (
                                        <MenuItem value={plan.timestamp} key={plan.timestamp}>
                                            {plan.type}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ gap: "1vw" }}>
                    <Button
                        variant="outlined"
                        sx={{ flex: 1, borderRadius: "5vw" }}
                        onClick={() => {
                            formik.resetForm()
                            setOpenPlanModal(false)
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" sx={{ flex: 1, borderRadius: "5vw" }}>
                        {plan ? "Salvar" : "Adicionar"}
                    </Button>
                </Box>
            </form>
        </Dialog>
    )
}
