import React, { useEffect, useState } from "react"
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { useFormik } from "formik"
import { Category, CategoryForm } from "../types/server/class/Category"
import { Avatar, FileInputButton } from "@files-ui/react"
import { api } from "../api/api"
import { NewCategoryModal } from "../components/settings/NewCategoryModal"

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
    const [loading, setLoading] = useState(false)
    const [categories, setCategorys] = useState<Category[]>([])
    const [imageSource, setImageSource] = useState<File>()
    const [openModal, setOpenModal] = useState(false)

    const fetchCategories = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await api.get("/category/list")
            setCategorys(response.data)
            console.log(categories)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [categories])

    const formikCategories = useFormik<CategoryForm>({
        initialValues: { name: "" },
        onSubmit: async () => {
            if (loading) return
            setLoading(true)

            try {
                const response = await api.post("/category", formikCategories.values)
                console.log(response.data)
                setOpenModal(!openModal)
                fetchCategories()
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
        },
    })

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

                        <NewCategoryModal
                            formik={formikCategories}
                            imageSource={imageSource}
                            setImageSource={setImageSource}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                        />
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
