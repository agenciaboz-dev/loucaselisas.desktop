import React, { useState } from "react"
import { Box, Grid, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useNavigate } from "react-router-dom"
import { Role, RoleForm } from "../../types/server/class/Role"
import { api } from "../../api/api"
import { useSnackbar } from "burgos-snackbar"
import { DeleteConfirm } from "./DeleteConfirm"
import { DuplicateConfirm } from "./DuplicateConfirm"
interface TypeUserCardProps {
    role: Role
    setSelectedRole: React.Dispatch<React.SetStateAction<Role | null>>
    fetchRoles: () => Promise<void>
}

export const TypeUserCard: React.FC<TypeUserCardProps> = ({ role, setSelectedRole, fetchRoles }) => {
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const [hover, setHover] = useState(false)
    const [openModal, setopenModal] = useState(false)
    const [openModalDuplicate, setopenModalDuplicate] = useState(false)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const click = () => {
        navigate("")
        handleClose()
    }

    const handleDelete = async () => {
        try {
            if (role) {
                const response = await api.get(`/role/delete?id=${role.id}`)
                console.log(response)
                // snackbar({ text: "Deletado com sucesso!", severity: "success" })
            } else {
                // snackbar({ text: "Erro ao deletar", severity: "error" })
            }
            fetchRoles()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDuplicate = async () => {
        const values: RoleForm = {
            name: role?.name + " cópia",
            description: role?.description,
            permissions: {
                role_id: null,
                configTab: role?.permissions.configTab,
                creatorTab: role?.permissions.creatorTab,
                favoritesTab: role?.permissions.favoritesTab,
                panelTab: role?.permissions.panelTab,
                searchTab: role?.permissions.searchTab,
            },
        }
        try {
            if (values) {
                console.log({ DATA: values })
                fetchRoles()
                const response = await api.post("/role", values)
                console.log({ Add_Response: response })
                if (response) {
                    setopenModalDuplicate(false)
                    fetchRoles()
                }
            }
        } catch (error) {}
    }

    const defaultStyle = {
        flexDirection: "row",
        p: "0.5vw",
        gap: "0.5vw",
        borderRadius: "1vw",
        flex: 1,
        height: "fit-content",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
    }

    const hoverStyle = {
        ...defaultStyle,
        backgroundColor: "#E5E5E5", // Exemplo de cor quando o mouse está sobre o componente
    }
    return (
        <Grid item xs={1}>
            <Paper
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                sx={hover ? hoverStyle : defaultStyle}
                onClick={() => {
                    setSelectedRole(role)
                }}
            >
                {role.name.charAt(0).toUpperCase() + role.name.slice(1).toLowerCase()}
                <Box>
                    <IconButton
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        disabled={role.name !== "padrão" ? false : true}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    {role.name !== "padrão" && (
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={() => setopenModalDuplicate(true)}>Duplicar</MenuItem>

                            <MenuItem onClick={() => setopenModal(true)} sx={{ color: "red" }}>
                                Deletar
                            </MenuItem>
                        </Menu>
                    )}
                </Box>
                <DeleteConfirm
                    name={role.name}
                    openDeleteConfirm={openModal}
                    setopenModal={setopenModal}
                    onConfirm={handleDelete}
                />
                <DuplicateConfirm
                    name={role.name}
                    openDuplicateConfirm={openModalDuplicate}
                    setopenModal={setopenModalDuplicate}
                    onConfirm={handleDuplicate}
                />
            </Paper>
        </Grid>
    )
}
