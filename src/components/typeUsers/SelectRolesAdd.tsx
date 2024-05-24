import React, { useEffect, useState } from "react"
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { Role } from "../../types/server/class/Role"

interface SelectRolesAddProps {
    roles: Role[]
    selectedPermissions: string[] // Permissões selecionadas
    onSelectPermission: (permissions: string[]) => void // Função para selecionar uma permissão
    menu: string
}

interface PermissionLabels {
    [key: string]: string
}

const permissionLabels: PermissionLabels = {
    panelTab: "Painel",
    creatorTab: "Criador",
    searchTab: "Pesquisa",
    favoritesTab: "Favoritos",
    configTab: "Configuração",
    menuAdmin: "Menu Administrador",
    menuStudent: "Menu Estudante",
}

const menuGroups = {
    admin: ["menuAdmin"],
    student: ["menuStudent"],
    creator: ["panelTab", "creatorTab", "searchTab", "favoritesTab", "configTab"],
}
export const SelectRolesAdd: React.FC<SelectRolesAddProps> = ({ roles, selectedPermissions, onSelectPermission, menu }) => {
    const [localSelectedPermissions, setLocalSelectedPermissions] = useState<string[]>(selectedPermissions)

    useEffect(() => {
        setLocalSelectedPermissions(selectedPermissions)
    }, [selectedPermissions])

    const handleChange = (permission: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedPermissions = event.target.checked
            ? [...localSelectedPermissions, permission]
            : localSelectedPermissions.filter((p) => p !== permission)

        setLocalSelectedPermissions(newSelectedPermissions)
        onSelectPermission(newSelectedPermissions) // Propaga as mudanças para o componente pai
    }

    return (
        <>
            <TextField
                select
                InputProps={{
                    sx: { height: "2vw" }, // Define a altura do input
                }}
                SelectProps={{
                    MenuProps: {
                        MenuListProps: { sx: { width: "100%", height: "100%", bgcolor: "#E5E5E5" } },
                        sx: { maxHeight: "29vh", borderRadius: "1vw" },
                    },
                }}
            >
                <Box sx={{ flexDirection: "column", display: "flex" }}>
                    {menu === "admin" &&
                        menuGroups.admin.map((permission) => (
                            <FormControlLabel
                                key={permission}
                                label={permissionLabels[permission]}
                                control={
                                    <Checkbox
                                        checked={localSelectedPermissions.includes(permission)}
                                        onChange={handleChange(permission)}
                                    />
                                }
                                sx={{ p: "0 1vw" }}
                            />
                        ))}
                    {menu === "student" &&
                        menuGroups[menu].map((permission) => (
                            <FormControlLabel
                                key={permission}
                                label={permissionLabels[permission]}
                                control={
                                    <Checkbox
                                        checked={localSelectedPermissions.includes(permission)}
                                        onChange={handleChange(permission)}
                                    />
                                }
                                sx={{ p: "0 1vw" }}
                            />
                        ))}
                    {menu === "creator" &&
                        menuGroups.creator.map((permission) => (
                            <FormControlLabel
                                key={permission}
                                label={permissionLabels[permission]}
                                control={
                                    <Checkbox
                                        checked={localSelectedPermissions.includes(permission)}
                                        onChange={handleChange(permission)}
                                    />
                                }
                                sx={{ p: "0 1vw" }}
                            />
                        ))}
                </Box>
            </TextField>
        </>
    )
}
