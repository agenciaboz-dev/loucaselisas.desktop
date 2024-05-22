import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox, CircularProgress, Dialog, DialogTitle, Divider, MenuItem, Paper, Switch, TextField, Typography } from "@mui/material"
import { AproveModal } from "./AproveModal"
import { useFormik } from "formik"
import { ReproveModal } from "./ReproveModal"
import { StatusForm } from "../../types/statusForm"
import { api } from "../../api/api"
import { Course, PartialCourse, Status } from "../../types/server/class/Course"
import { formatStatus } from "../../tools/formatStatus"
import { Plan } from "../../types/server/class/Plan"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { Role } from "../../types/server/class/Role"
import { useCurrencyMask } from "burgos-masks"
import { CurrencyText } from "../masks/CurrencyText"
import MaskedInput from "../masks/MaskedInput"
import { unmaskCurrency } from "../../tools/unmask"
import * as Yup from "yup"

interface FormAproveCourseProps {
    course: Course
    name: string
    type: "course" | "lesson"
    id: string
    status: Status
    onChangeStatus: () => Promise<void>
}

export const FormAproveCourse: React.FC<FormAproveCourseProps> = ({ course, name, type, id, status, onChangeStatus }) => {
    const currencyMask = useCurrencyMask()
    const FormatedStatus = formatStatus(status)
    const required_message = "Campo obrigatório"
    const validateSchema = Yup.object().shape({
        price: Yup.string()
            .min(3, required_message)
            .test("is-not-zero", "O valor deve ser maior que 0", (value) => value !== "R$ 0")
            .required(required_message),

        plans: Yup.array().min(1, required_message),

        roles: Yup.array().min(1, required_message),
    })

    const [loading, setLoading] = useState(false)
    const [openAproveModal, setOpenAproveModal] = useState(false)
    const [openReproveModal, setOpenReproveModal] = useState(false)
    const [plans, setPlans] = useState<Plan[]>([])
    const [userTypes, setUserTypes] = useState<Role[]>([])

    const handleOpenAproveModal = () => setOpenAproveModal(!openAproveModal)
    const handleopenReproveModal = () => setOpenReproveModal(!openReproveModal)

    const fetchUsersTypes = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await api.get("/user/types")
            setUserTypes(response.data)
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
        fetchUsersTypes()
    }, [])

    const formik = useFormik<PartialCourse>({
        initialValues: { id: id, status: "active", price: 0, plans: [], roles: [] },

        validationSchema: validateSchema,

        onSubmit: async (values) => {
            if (loading) return
            setLoading(true)
            try {
                values.price = unmaskCurrency(values.price!)
                const response = await api.patch("/course", values)
                formik.resetForm()
                onChangeStatus()
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

    const onDisabled = async () => {
        const data: StatusForm = { id: id, status: "pending" }
        if (loading) return
        setLoading(true)

        try {
            const response = await api.patch("/course", data)
            onChangeStatus()
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    const onReprove = async (reason: string) => {
        const data: StatusForm = { id: id, status: "declined", declined_reason: reason }
        if (loading) return
        setLoading(true)
        setOpenAproveModal(false)
        try {
            const response = await api.patch("/course", data)
            setOpenReproveModal(!openReproveModal)
            onChangeStatus()
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    return (
        <Box sx={{}}>
            <Paper sx={{ flex: 1, p: "0.7vw", borderRadius: "1vw" }}>
                <Box sx={{ flexDirection: "column", flex: 1, gap: "1vw" }}>
                    <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        {loading ? (
                            <CircularProgress size="25px" />
                        ) : (
                            <Box sx={{ alignItems: "center", gap: "0.3vw" }}>
                                <FormatedStatus.Icon />
                                <Typography>Status do conteúdo: {FormatedStatus.text} </Typography>
                            </Box>
                        )}

                        <Switch checked={status === "active"} disabled={status !== "active"} onChange={() => onDisabled()} />
                    </Box>
                    <Divider />
                    {status === "active" || status === "disabled" ? (
                        <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                            <Typography variant="subtitle1" component="h3" sx={{ fontSize: "1.2rem" }}>
                                Informações do Curso
                            </Typography>
                            <Box sx={{ gap: "0.5vw" }}>
                                <Typography variant="body2" component="p" sx={{ fontSize: "1.1rem" }}>
                                    Tipo de planos:
                                </Typography>
                                {course.plans.map((plan) => (
                                    <Typography variant="body2" component="p" key={plan.id}>
                                        {plan.name}
                                    </Typography>
                                ))}
                            </Box>
                            <Box sx={{ gap: "0.5vw" }}>
                                <Typography variant="body2" component="p" sx={{ fontSize: "1.1rem" }}>
                                    Tipo de Usuarios:
                                </Typography>
                                {course.roles.map((role) => (
                                    <Typography variant="body2" component="p" key={role.id}>
                                        {role.name}
                                    </Typography>
                                ))}
                            </Box>
                            <Box sx={{ gap: "0.5vw" }}>
                                <Typography variant="body2" component="p" sx={{ fontSize: "1.1rem" }}>
                                    Valor:
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <CurrencyText value={course.price} />
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ justifyContent: "space-between", gap: "1vw" }}>
                                <Box sx={{ flexDirection: "column", flex: 1 }}>
                                    <Box sx={{ justifyContent: "space-between", flex: 1 }}>
                                        <Typography variant="body1" component="p" sx={{ fontSize: "1.1rem" }}>
                                            Tipo de Plano
                                        </Typography>
                                    </Box>
                                    <TextField
                                        select
                                        placeholder="plano"
                                        name="plans"
                                        onChange={formik.handleChange}
                                        value={formik.values.plans}
                                        SelectProps={{
                                            MenuProps: { MenuListProps: { sx: { width: 1 } } },
                                            multiple: true,
                                            renderValue: (selected: number[]) =>
                                                plans
                                                    .filter((item) => selected.includes(item.id))
                                                    .map((item) => item.name)
                                                    .join(", "),
                                        }}
                                        sx={{ maxWidth: "15vw" }}
                                        error={formik.touched.plans && Boolean(formik.errors.plans)}
                                        helperText={formik.touched.plans && formik.errors.plans}
                                    >
                                        {plans.map((plan) => (
                                            <MenuItem key={plan.id} value={plan.id}>
                                                <Checkbox checked={formik.values.plans.includes(plan.id)} /> {plan.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box sx={{ flexDirection: "column", flex: 1 }}>
                                    <Typography variant="body1" component="p" sx={{ fontSize: "1.1rem" }}>
                                        Valor
                                    </Typography>
                                    <TextField
                                        name="price"
                                        value={formik.values.price || ""}
                                        onChange={formik.handleChange}
                                        InputProps={{ inputComponent: MaskedInput, inputProps: { mask: currencyMask } }}
                                        error={formik.touched.price && Boolean(formik.errors.price)}
                                        helperText={formik.touched.price && formik.errors.price}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flexDirection: "column", flex: 1 }}>
                                <Typography variant="body1" component="p" sx={{ fontSize: "1.1rem" }}>
                                    Tipo de Usuário
                                </Typography>
                                <TextField
                                    select
                                    name="roles"
                                    value={formik.values.roles}
                                    onChange={formik.handleChange}
                                    // helperText="Selecione o tipo de usuário que irá ter acesso ao curso"
                                    SelectProps={{ MenuProps: { MenuListProps: { sx: { width: 1 } } }, multiple: true }}
                                    error={formik.touched.roles && Boolean(formik.errors.roles)}
                                    helperText={formik.touched.roles && formik.errors.roles}
                                >
                                    {userTypes.map((type) => (
                                        <MenuItem value={type.id} key={type.id}>
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box sx={{ justifyContent: "space-between" }}>
                                <MenuItem sx={{ pl: 0 }}>
                                    <Typography variant="body1" component="p">
                                        Criar cupom?
                                    </Typography>
                                </MenuItem>
                                <Button startIcon={<AddCircleOutlineIcon />} sx={{ px: "1vw", border: "1px dashed", borderRadius: "5vw" }}>
                                    Adicionar
                                </Button>
                                {/* <Dialog open sx={{ flexDirection: "column" }}>
                                <DialogTitle>Adicionar novo cupom</DialogTitle>
                                <TextField placeholder="Código do cupom"></TextField>
                                <TextField placeholder="Descrição "></TextField>
                            </Dialog> */}
                            </Box>
                            <Box sx={{ justifyContent: "space-between", gap: "0.5vw" }}>
                                {status === "pending" && (
                                    <>
                                        <Button fullWidth variant="outlined" sx={{ borderRadius: "2vw" }} onClick={handleopenReproveModal}>
                                            Reprovar
                                        </Button>
                                        <Button fullWidth variant="contained" sx={{ borderRadius: "2vw" }} onClick={handleOpenAproveModal}>
                                            Aprovar
                                        </Button>
                                    </>
                                )}
                                <AproveModal
                                    name={name}
                                    type={type}
                                    openAproveModal={openAproveModal}
                                    onConfirm={formik.handleSubmit}
                                    handleOpenAproveModal={handleOpenAproveModal}
                                />
                                <ReproveModal
                                    name={name}
                                    type={type}
                                    openReproveModal={openReproveModal}
                                    handleOpenReproveModal={handleopenReproveModal}
                                    onConfirm={onReprove}
                                />
                            </Box>
                        </>
                    )}
                </Box>
            </Paper>
        </Box>
    )
}
