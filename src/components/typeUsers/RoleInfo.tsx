import React, { useEffect, useState } from "react"
import { Box, Checkbox, Divider, FormControlLabel, MenuItem, Paper, Skeleton, TextField, Typography } from "@mui/material"
import { OutlineButton } from "./OutlineButtom"
import { FaEdit } from "react-icons/fa"
import { SelectRoles } from "./SelectRoles"
import { Role, RoleForm } from "../../types/server/class/Role"
import { User } from "../../types/server/class"
import { api } from "../../api/api"
import { useFormik } from "formik"
import { TypeUserModal } from "./TypeUserModal"
import { SelectRolesAdd } from "./SelectRolesAdd"
import { PermissionsOption } from "../../types/PermissionsOption"

interface RoleInfoProps {
    roles: Role[]
    role: Role | null
    fetchRoles: () => Promise<void>
}

export const RoleInfo: React.FC<RoleInfoProps> = ({ role, roles, fetchRoles }) => {
    const [users, setUsers] = useState<User[]>([])
    const [usersRole, setUsersRole] = useState(0)
    const [openModalEdit, setopenModalEdit] = useState(false)

    const getUsers = async () => {
        try {
            const response = await api.get("/user/all")
            setUsers(response.data)
            console.log({ users: response.data })
        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik<RoleForm>({
        initialValues: role
            ? { ...role }
            : {
                  name: "",
                  description: "",
                  permissions: {
                      role_id: null,
                      configTab: false,
                      creatorTab: false,
                      favoritesTab: false,
                      panelTab: false,
                      searchTab: false,
                  },
              },
        onSubmit: async (values) => {},
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
    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        setUsersRole(users.filter((item) => item.role.id === role?.id).length)
    }, [role])
    return (
        <Paper
            sx={{
                borderRadius: "1vw",
                flex: 1,
                height: "100%",
                p: "1vw",
                flexDirection: "column",
                gap: "0.5vw",
                overflowY: "hidden",
            }}
        >
            <Box sx={{ width: 1, justifyContent: "space-between", alignItems: "center" }}>
                <Typography component={"h2"} fontSize={"1.3rem"}>
                    Role ID
                </Typography>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    {role ? (
                        role.name.charAt(0).toUpperCase() + role.name.slice(1).toLowerCase()
                    ) : (
                        <Skeleton animation="wave" variant="rounded" sx={{ width: "10vw", height: "2vw" }} />
                    )}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ width: 1, justifyContent: "space-between", alignItems: "center" }}>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    Número de Membros
                </Typography>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    {role ? usersRole : <Skeleton animation="wave" variant="rounded" sx={{ width: "2vw", height: "2vw" }} />}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ flexDirection: "column", textAlign: "justify", width: 1, gap: "0.5vw" }}>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    Descrição
                </Typography>
                {role ? (
                    <Typography component={"p"} fontSize={"1rem"}>
                        {role.description}
                    </Typography>
                ) : (
                    <Skeleton animation="wave" variant="rounded" sx={{ width: "100%", height: "4vw" }} />
                )}
            </Box>
            <Divider />
            <Box sx={{ flexDirection: "column", textAlign: "justify", width: 1, gap: "0.4vw" }}>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    Menus Disponíveis
                </Typography>

                {role ? (
                    <Box sx={{ flexDirection: "column", gap: "1vw", width: 1 }}>
                        <SelectRolesAdd permissions={menuStudent} title={"Estudante"} formik={formik} edit={false} view />
                        <SelectRolesAdd permissions={menuCreator} title={"Criador"} formik={formik} edit={false} view />
                    </Box>
                ) : (
                    <Box sx={{ flexDirection: "column", gap: "1vw", width: 1 }}>
                        <Skeleton animation="wave" variant="rounded" sx={{ width: "100%", height: "2vw" }} />
                        <Skeleton animation="wave" variant="rounded" sx={{ width: "100%", height: "2vw" }} />
                    </Box>
                )}
            </Box>
            {role && role.name !== "padrão" && (
                <OutlineButton
                    type="submit"
                    title="Editar"
                    handleClick={() => {
                        setopenModalEdit(true)
                    }}
                    Icon={FaEdit}
                    style={{ alignSelf: "end", padding: "2px 10px" }}
                />
            )}
            <TypeUserModal
                openModal={openModalEdit}
                setOpenModal={setopenModalEdit}
                roles={roles}
                role={role}
                fetchRoles={fetchRoles}
                edit={true}
            />
        </Paper>
    )
}
