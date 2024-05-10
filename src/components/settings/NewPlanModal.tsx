import React from "react"
import { Box, Button, Dialog, MenuItem, TextField, Typography } from "@mui/material"

interface NewPlanModalProps {
    formik?: {
        handleChange: (e: React.ChangeEvent<any>) => void
        handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
    }

    openPlanModal: boolean
    setOpenPlanModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewPlanModal: React.FC<NewPlanModalProps> = ({ formik, openPlanModal, setOpenPlanModal }) => {
    return (
        <Dialog
            open={openPlanModal}
            onClose={() => setOpenPlanModal(false)}
            PaperProps={{ sx: { width: "100%", maxWidth: "fit-content", padding: "1vw", gap: "1vw", borderRadius: "1.2vw" } }}
        >
            <form onSubmit={formik?.handleSubmit}>
                <Box>
                    <Typography variant="body1" component="p" sx={{ fontSize: "1.5rem" }}>
                        Adicionar Plano
                    </Typography>
                </Box>
                <Box sx={{ gap: "1vw", width: "100%" }}>
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                            <Typography>Nome do Plano</Typography>
                            <TextField name="name" onChange={formik?.handleChange} sx={{ width: "30vw" }} />
                        </Box>
                        <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                            <Typography>Descrição do Plano</Typography>
                            <TextField name="desciprition" onChange={formik?.handleChange} sx={{ width: "30vw" }} />
                        </Box>
                        <Box sx={{ gap: "1vw", alignItems: "center" }}>
                            <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                                <Typography>Valor</Typography>
                                <TextField name="price" onChange={formik?.handleChange} sx={{ width: "13.5vw" }} />
                            </Box>
                            <Typography variant="body1" component="p" sx={{ mt: "15px" }}>
                                por
                            </Typography>
                            <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                                <Typography>Periodo</Typography>
                                <TextField select name="duration" onChange={formik?.handleChange} sx={{ width: "13.5vw" }}>
                                    <MenuItem>teste1</MenuItem>
                                    <MenuItem>teste2</MenuItem>
                                    <MenuItem>teste3</MenuItem>
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
                            setOpenPlanModal(false)
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" sx={{ flex: 1, borderRadius: "5vw" }}>
                        Adicionar
                    </Button>
                </Box>
            </form>
        </Dialog>
    )
}
