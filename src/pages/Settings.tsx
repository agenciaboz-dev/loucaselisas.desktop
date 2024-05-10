import React, { useEffect, useState } from "react"
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { useFormik } from "formik"
import { Category, CategoryForm } from "../types/server/class/Category"
import { Avatar, FileInputButton } from "@files-ui/react"
import { api } from "../api/api"
import { NewCategoryModal } from "../components/settings/NewCategoryModal"
import { SettingsCard } from "../components/settings/SettingsCard"
import { Plan } from "../types/server/class/Plan"

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
    const [loading, setLoading] = useState(false)
    const [categories, setCategorys] = useState<Category[]>([])
    const [plans, setPlans] = useState<Plan[]>([])
    const [imageSource, setImageSource] = useState<File>()
    const [openCategoryModal, setOpenCategoryModal] = useState(false)
    const [openPlanModal, setOpenPlanModal] = useState(false)

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

    // const deleteCategories = async () => {
    //     if (loading) return
    //     setLoading(true)

    //     try {
    //         const response = await api.delete("/")
    //     } catch (error) {}
    // }

    const fetchPlans = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await api.get("/plan")
            setPlans(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    useEffect(() => {
        fetchPlans()
    }, [])

    const formikCategories = useFormik<CategoryForm>({
        initialValues: { name: "" },
        onSubmit: async () => {
            if (loading) return
            setLoading(true)

            try {
                const response = await api.post("/category", formikCategories.values)
                console.log(response.data)
                setOpenCategoryModal(!openCategoryModal)
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
                                    setOpenCategoryModal(!openCategoryModal)
                                }}
                            >
                                Adicionar Categoria
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: "0.5vw",
                                p: " 0.1vw 0.5vw 1vw 0.2vw ",
                                overflow: "scroll",
                                maxHeight: "61.8vh",
                            }}
                        >
                            {categories.map((category) => (
                                <SettingsCard key={category.id} image={category.cover} name={category.name} openEditModal={setOpenCategoryModal} />
                            ))}
                        </Box>
                        <NewCategoryModal
                            formik={formikCategories}
                            imageSource={imageSource}
                            setImageSource={setImageSource}
                            openModal={openCategoryModal}
                            setOpenModal={setOpenCategoryModal}
                        />
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Typography>Planos</Typography>
                        <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                            <Button
                                startIcon={<AddCircleOutlineIcon />}
                                sx={{ borderRadius: "5vw", border: "1px dashed" }}
                                onClick={() => {
                                    setOpenPlanModal(!openPlanModal)
                                }}
                            >
                                Adicionar Planos
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: "0.5vw",
                                p: " 0.1vw 0.5vw 1vw 0.2vw ",
                                overflow: "scroll",
                                maxHeight: "61.8vh",
                            }}
                        >
                            {plans.map((plan) => (
                                <SettingsCard key={plan.id} name={plan.name} openEditModal={setOpenPlanModal} plan />
                            ))}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>Graficos</Box>
                </Grid>
            </Grid>
        </Box>
    )
}
