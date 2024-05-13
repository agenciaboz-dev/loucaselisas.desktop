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
import { PartialPlan, Plan, PlanForm } from "../types/server/class/Plan"
import { NewPlanModal } from "../components/settings/NewPlanModal"
import { StatisticGraphycs } from "../components/settings/StatisticGraphyc"

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
    const [loading, setLoading] = useState(false)
    const [categories, setCategorys] = useState<Category[]>([])
    const [plans, setPlans] = useState<Plan[]>([])
    const [imageSource, setImageSource] = useState<File>()
    const [openCategoryModal, setOpenCategoryModal] = useState(false)
    const [openPlanModal, setOpenPlanModal] = useState(false)

    const formikPlans = useFormik<PlanForm>({
        initialValues: { name: "", description: "", duration: "", price: 0 },
        onSubmit: async () => {
            if (loading) return
            setLoading(true)

            try {
                formikPlans.values.price = Number(formikPlans.values.price)
                const response = await api.post("/plan", formikPlans.values)
                console.log(response.data)
                setOpenPlanModal(!openPlanModal)
                fetchPlans()
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => setLoading(false), 500)
            }
        },
    })

    const formikCategories = useFormik<CategoryForm>({
        initialValues: { name: "", cover: undefined },
        onSubmit: async (values) => {
            if (loading) return
            setLoading(true)

            try {
                const formData = new FormData()

                formData.append("data", JSON.stringify(values))

                if (imageSource) formData.append("file", imageSource)

                const response = await api.post("/category", formData)
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
        fetchCategories()
    }, [])

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
                                    setOpenPlanModal(true)
                                    console.log(openPlanModal)
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
                        <NewPlanModal formik={formikPlans} openPlanModal={openPlanModal} setOpenPlanModal={setOpenPlanModal} />
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Typography>Graficos</Typography>
                        <StatisticGraphycs />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
