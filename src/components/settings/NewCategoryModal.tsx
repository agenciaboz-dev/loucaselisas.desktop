import React from "react"
import { Box, Button, Dialog, TextField, Typography } from "@mui/material"
import { Avatar, FileInputButton } from "@files-ui/react"

interface NewCategoryModalProps {}

export const NewCategoryModal: React.FC<NewCategoryModalProps> = ({}) => {
    return (
        <Dialog
            open={openModal}
            onClose={() => setOpenModal(!openModal)}
            PaperProps={{ sx: { width: "100%", maxWidth: "fit-content", padding: "1vw", gap: "1vw", borderRadius: "1.2vw" } }}
        >
            <form onSubmit={formikCategories.handleSubmit}>
                <Box>
                    <Typography variant="body1" component="p" sx={{ fontSize: "1.1rem" }}>
                        Adicionar Categoria
                    </Typography>
                </Box>
                <Box sx={{ gap: "1vw", width: "100%" }}>
                    <Avatar readOnly src={imageSource || "/placeholders/perfil.webp"} style={{ width: "135px", height: "135px" }} />
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                            <Typography>Nome da Categoria</Typography>
                            <TextField
                                name="name"
                                value={formikCategories.values.name}
                                onChange={formikCategories.handleChange}
                                sx={{ width: "20vw" }}
                            />
                        </Box>
                        <Box sx={{ gap: "1vw", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography>Adicionar a imagem a categoria</Typography>
                            <FileInputButton
                                label="Procurar"
                                accept="image/*"
                                onChange={(files) => setImageSource(files[0].file)}
                                style={{ textTransform: "none", borderRadius: "5vw", backgroundColor: "#88827C" }}
                            />
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
