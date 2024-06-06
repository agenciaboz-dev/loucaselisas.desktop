import React, { useEffect, useState } from "react"
import { Box, Button, Dialog, TextField, Typography } from "@mui/material"
import { SelectRolesAdd } from "./SelectRolesAdd"
import { Role, RoleForm } from "../../types/server/class/Role"
import { useFormik } from "formik"
import { api } from "../../api/api"
import { PermissionsOption } from "../../types/PermissionsOption"
import { User } from "../../types/server/class"

interface AddTypeUserModalProps {
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    roles: Role[]
    fetchRoles: () => Promise<void>
}

export const AddTypeUserModal: React.FC<AddTypeUserModalProps> = ({ openModal, setOpenModal, fetchRoles }) => {
    const [users, setUsers] = useState<User[]>([])
    const formik = useFormik<RoleForm>({
        initialValues: {
            name: "",
            permissions: {
                role_id: null,
                configTab: false,
                creatorTab: false,
                favoritesTab: false,
                panelTab: false,
                searchTab: false,
            },
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log({ DATA: values })
                const response = await api.post("/role", values)
                console.log(response)
                if (response) {
                    setOpenModal(false)
                    fetchRoles()
                    resetForm()
                }
            } catch (error) {}
        },
        enableReinitialize: true,
    })
    const menuAdmin: PermissionsOption[] = []
    const menuStudent: PermissionsOption[] = [
        { label: "Pesquisa", value: "searchTab" },
        { label: "Painel", value: "panelTab" },
        { label: "Favoritos", value: "favoritesTab" },
        { label: "Configurações", value: "configTab" },
    ]
    const menuCreator: PermissionsOption[] = [{ label: "Criador", value: "creatorTab" }]

    const getUsers = async () => {
        try {
            const response = await api.get("/user/all")
            setUsers(response.data)
            console.log({ users: response.data })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Dialog
            open={openModal}
            onClose={() => setOpenModal(!openModal)}
            PaperProps={{
                sx: { width: "100%", maxWidth: "40%", padding: "1vw", gap: "1vw", borderRadius: "1.2vw" },
            }}
        >
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ width: 1, flexDirection: "column", gap: "2vw" }}>
                    <Box>
                        <Typography variant="body1" component="p" sx={{ fontSize: "1.5rem" }}>
                            Novo tipo de usuário
                        </Typography>
                    </Box>
                    <Box sx={{ width: 1, flexDirection: "row", gap: "1vw" }}>
                        <Box sx={{ gap: "1vw", width: "47%" }}>
                            <Box
                                sx={{ flexDirection: "column", gap: "1vw", width: "100%", justifyContent: "space-between" }}
                            >
                                <Box sx={{ width: "100%", flexDirection: "column", gap: "0.1vw" }}>
                                    <Typography>Nome</Typography>
                                    <TextField
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            sx: { height: "2vw" }, // Define a altura do input
                                        }}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Box>
                                <Box sx={{ flexDirection: "column", gap: "0.1vw", width: "100%" }}>
                                    <Typography>Descrição</Typography>
                                    <TextField
                                        multiline
                                        minRows={2}
                                        name="description"
                                        // value={formik.values.description}
                                        onChange={formik.handleChange}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ width: "50%", flexDirection: "column", textAlign: "justify", gap: "1vw" }}>
                            {/* <SelectRolesAdd permissions={menuAdmin} title={"Administrador"} formik={formik} /> */}
                            <SelectRolesAdd permissions={menuStudent} title={"Estudante"} formik={formik} />
                            <SelectRolesAdd permissions={menuCreator} title={"Criador"} formik={formik} />
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
                </Box>
            </form>
        </Dialog>
    )
}
