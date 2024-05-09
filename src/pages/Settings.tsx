import React, { useEffect, useState } from "react"
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { useFormik } from "formik"
import { Category, CategoryForm } from "../types/server/class/Category"
import { Avatar, FileInputButton } from "@files-ui/react"
import { api } from "../api/api"
import { Form } from "../components/login/Form"

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
    const [imageSource, setImageSource] = useState<File>()

    const [openModal, setOpenModal] = useState(false)

    return (
        <Box sx={{ flexDirection: "column", flex: 1 }}>
            <HeaderInfo title="Configurações" exitButton={false} refreshButton={false} />
            <Grid container columns={3} spacing={2} sx={{ pt: "1vw" }}>
                <Grid item xs={1}>
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Typography>Categorias</Typography>
                        <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                            <Button
                                startIcon={<AddCircleOutlineIcon />}
                                sx={{ borderRadius: "5vw", border: "1px dashed" }}
                                onClick={() => {
                                    setOpenModal(!openModal)
                                }}
                            >
                                Adicionar Categoria
                            </Button>
                        </Box>
                        <Dialog
                            open={openModal}
                            onClose={() => setOpenModal(!openModal)}
                            PaperProps={{ sx: { width: "100%", maxWidth: "fit-content", padding: "1vw", gap: "1vw", borderRadius: "1.2vw" } }}
                        >
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
                                        <TextField name="name" sx={{ width: "20vw" }} />
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
                        </Dialog>
                        {<Paper></Paper>}
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Typography>Planos</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography>Estatisticas & Relatórios</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}
