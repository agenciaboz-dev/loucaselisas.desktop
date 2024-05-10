import React from "react"
import { Box, Button, Dialog, TextField, Typography } from "@mui/material"
import { BooleanSchema } from "yup"

interface NewPlanModalProps {
    formik: {
        handleChange: (e: React.ChangeEvent<any>) => void
        handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
    }

    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewPlanModal: React.FC<NewPlanModalProps> = ({ formik, openModal, setOpenModal }) => {
    return (
        <Dialog
            open={openModal}
            onClose={() => setOpenModal(!openModal)}
            PaperProps={{ sx: { width: "100%", maxWidth: "fit-content", padding: "1vw", gap: "1vw", borderRadius: "1.2vw" } }}
        >
            <form onSubmit={formik.handleSubmit}>
                <Box>
                    <Typography variant="body1" component="p" sx={{ fontSize: "1.1rem" }}>
                        Adicionar Categoria
                    </Typography>
                </Box>
                <Box sx={{ gap: "1vw", width: "100%" }}>
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                            <Typography>Nome da Categoria</Typography>
                            //! implementar o value no TextField
                            {/* value={formik.values.name} */}
                            <TextField name="name" onChange={formik.handleChange} sx={{ width: "20vw" }} />
                        </Box>
                        <Box sx={{ gap: "1vw", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography>Adicionar a imagem a categoria</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ gap: "1vw" }}>
                    <Button
                        variant="outlined"
                        sx={{ flex: 1, borderRadius: "5vw" }}
                        onClick={() => {
                            setOpenModal(!openModal)
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
