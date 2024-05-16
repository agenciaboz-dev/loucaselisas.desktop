import React, { useEffect, useState } from "react"
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Paper, Skeleton, TextField, Typography } from "@mui/material"
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
import * as Yup from "yup"

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
    const skeletonSettingsCard: number[] = new Array(20).fill(0).map((_, index) => index)

    const required_message = "Campo obrigatório"
    const categorySchema = Yup.object().shape({
        name: Yup.string().required(required_message),
    })

    const [loading, setLoading] = useState(false)
    const [categories, setCategorys] = useState<Category[]>([])
    const [currentCategory, setCurrentCategory] = useState<Category | undefined>(undefined)
    const [plans, setPlans] = useState<Plan[]>([])
    const [imageSource, setImageSource] = useState<File>()
    const [openCategoryModal, setOpenCategoryModal] = useState(false)
    const [openPlanModal, setOpenPlanModal] = useState(false)

    const formikPlans = useFormik<PlanForm>({
        initialValues: { name: "", description: "", duration: "", price: 0, active: true },
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
        initialValues: currentCategory ? { ...currentCategory, cover: undefined } : { name: "", cover: undefined, active: true },
        // initialValues: currentCategory ? { name: currentCategory.name, cover: currentCategory.cover || undefined  } : { name: "", cover: undefined },
        // initialValues: { name: currentCategory?.name || "", cover: currentCategory?.cover || undefined },
        // initialValues: { name: "", cover: undefined },

        validationSchema: categorySchema,

        onSubmit: async (values) => {
            if (loading) return
            setLoading(true)

            try {
                const formData = new FormData()

                formData.append("data", JSON.stringify(values))

                if (imageSource) formData.append("file", imageSource)

                const response = currentCategory ? await api.patch("/category", formData) : await api.post("/category", formData)
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
        enableReinitialize: true,
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

    useEffect(() => {
        if (openCategoryModal == false) {
            setCurrentCategory(undefined)
            setImageSource(undefined)
        }
    }, [openCategoryModal])

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
                            {loading
                                ? skeletonSettingsCard.map((_, index) => (
                                      <>
                                          <Paper key={index} sx={{ width: 1, height: "3.5vw", p: "0.5vw" }}>
                                              <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                                                  <Box sx={{ gap: "0.5vw", flex: 1, alignItems: "center", width: "17.8vw" }}>
                                                      <Skeleton variant="circular" sx={{ width: "2.5vw", height: "2.5vw" }} />
                                                      <Skeleton variant="rectangular" sx={{ width: "10vw" }} />
                                                  </Box>
                                                  <Box sx={{ width: "5vw", height: 1, gap: "0.2vw", marginLeft: "auto" }}></Box>
                                              </Box>
                                          </Paper>
                                      </>
                                  ))
                                : categories.map((category) => (
                                      <SettingsCard
                                          key={category.id}
                                          category={category}
                                          setCurrentCategory={setCurrentCategory}
                                          image={category.cover}
                                          name={category.name}
                                          openEditModal={setOpenCategoryModal}
                                      />
                                  ))}
                        </Box>
                        <NewCategoryModal
                            formik={formikCategories}
                            imageSource={imageSource}
                            setImageSource={setImageSource}
                            openModal={openCategoryModal}
                            setOpenModal={setOpenCategoryModal}
                            category={currentCategory}
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
                            {loading
                                ? skeletonSettingsCard.map((_, index) => (
                                      <>
                                          <Paper key={index} sx={{ width: 1, height: "3.5vw", p: "0.5vw" }}>
                                              <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                                                  <Box sx={{ gap: "0.5vw", flex: 1, alignItems: "center", width: "17.8vw" }}>
                                                      <Skeleton variant="rectangular" sx={{ width: "10vw" }} />
                                                  </Box>
                                                  <Box sx={{ width: "5vw", height: 1, gap: "0.2vw", marginLeft: "auto" }}></Box>
                                              </Box>
                                          </Paper>
                                      </>
                                  ))
                                : plans.map((plan) => <SettingsCard key={plan.id} name={plan.name} openEditModal={setOpenPlanModal} plan />)}
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
