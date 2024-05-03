import React from "react"
import { Box, Checkbox, Divider, FormControlLabel, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { OutlineButton } from "./OutlineButtom"
import { FaEdit } from "react-icons/fa"
import { SelectRoles } from "./SelectRoles"
import { Role } from "../../types/server/class/Role"

interface RoleInfoProps {
    roles: Role[]
    role: Role
}

export const RoleInfo: React.FC<RoleInfoProps> = ({ role, roles }) => {
    const [checked, setChecked] = React.useState([false, false, false, false, false])

    const menuAdmin = ["outros"]
    const menuStudent = ["searchTab"]
    const menuCreator = ["panelTab", "creatorTab", "searchTab", "favoritesTab", "configTab"]

    const selectedMenu = (typeUser: string) => {
        const menu = roles
            .filter((role) => role.permissions) // Garante que o role tem um objeto de permissões
            .flatMap((role) => Object.entries(role.permissions))
            .filter(([permission, isActive]) =>
                typeUser == "admin"
                    ? menuAdmin.includes(permission) && isActive
                    : typeUser == "student"
                    ? menuStudent.includes(permission) && isActive
                    : typeUser === "creator" && menuCreator.includes(permission) && isActive
            )
            .map(([permission]) => permission) // Extrai o nome da permissão
        return menu
    }
    return (
        <Paper sx={{ borderRadius: "1vw", width: 0.28, height: "100%", p: "1vw", flexDirection: "column", gap: "0.5vw" }}>
            <Box sx={{ width: 1, justifyContent: "space-between", alignItems: "center" }}>
                <Typography component={"h2"} fontSize={"1.3rem"}>
                    Role ID
                </Typography>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    {role.name}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ width: 1, justifyContent: "space-between", alignItems: "center" }}>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    Número de Membros
                </Typography>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    0
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ flexDirection: "column", textAlign: "justify", width: 1, gap: "0.5vw" }}>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    Descrição
                </Typography>
                <Typography component={"p"} fontSize={"1rem"}>
                    Facilisi etiam dignissim diam quis enim lobortis. Gravida arcu ac tortor dignissim convallis aenean et.
                    Bibendum enim facilisis gravida neque convallis. Malesuada fames ac turpis egestas integer.
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ flexDirection: "column", textAlign: "justify", width: 1, gap: "0.4vw" }}>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    Menus Disponíveis
                </Typography>
                <Typography component={"p"} fontSize={"1rem"}>
                    Administrador
                </Typography>
                <SelectRoles
                    selectedPermissions={selectedMenu("admin")}
                    onSelectPermission={(permission) => console.log(permission)}
                    roles={roles}
                    menu={"admin"}
                />

                <Typography component={"p"} fontSize={"1rem"}>
                    Estudante
                </Typography>
                <SelectRoles
                    selectedPermissions={selectedMenu("student")}
                    onSelectPermission={(permission) => console.log(permission)}
                    roles={roles}
                    menu="student"
                />
                <Typography component={"p"} fontSize={"1rem"}>
                    Criador de conteúdo
                </Typography>
                <SelectRoles
                    selectedPermissions={selectedMenu("creator")}
                    onSelectPermission={(permission) => console.log(permission)}
                    menu="creator"
                    roles={roles}
                />
            </Box>
            <OutlineButton title="Editar" handleClick={() => {}} Icon={FaEdit} style={{ alignSelf: "end" }} />
        </Paper>
    )
}
