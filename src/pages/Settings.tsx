import React from "react"
import { Box, Checkbox, Divider, Grid, IconButton, Paper, TextField, Typography } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { useFormik } from "formik"
import { CategoryForm } from "../types/server/class/Category"

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
    const label = { inputProps: { "aria-label": "categorias" } }

    const formikCategories = useFormik<CategoryForm>({ initialValues: { name: "" }, onSubmit: () => {} })
    const formikPlans = useFormik({ initialValues: {}, onSubmit: () => {} })

    return (
        <Box sx={{ flexDirection: "column", flex: 1 }}>
            <HeaderInfo title="Configurações" exitButton={false} refreshButton={false} />
            <Grid container columns={3} spacing={2} sx={{ pt: "1vw" }}>
                <Grid item xs={1}>
                    <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                        <Typography>Categorias</Typography>
                        <Box sx={{ justifyContent: "space-between" }}>
                            <Box sx={{ alignItems: "center" }}>
                                <Checkbox aria-label="selecionar todos" />
                                <Typography>Selecionar todos</Typography>
                            </Box>
                            <IconButton>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Box>
                        <Divider sx={{ mt: "-0.5vw" }} />
                        <Paper sx={{ p: "12px 12px 12px 0.3vw", gap: "0.3vw", borderRadius: "0.8vw" }}>
                            <Checkbox />
                            <TextField label="Nome" placeholder="Nome do plano" sx={{ flex: 1 }} />
                        </Paper>
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
