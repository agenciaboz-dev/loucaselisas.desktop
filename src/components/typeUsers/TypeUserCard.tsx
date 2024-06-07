import React, { useState } from "react"
import { Box, Grid, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useNavigate } from "react-router-dom"
import { Role } from "../../types/server/class/Role"

interface TypeUserCardProps {
    role: Role
    setSelectedRole: React.Dispatch<React.SetStateAction<Role | null>>
}

export const TypeUserCard: React.FC<TypeUserCardProps> = ({ role, setSelectedRole }) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const [hover, setHover] = useState(false)
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
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={click}>Editar</MenuItem>
                        <MenuItem onClick={click}>Ver usuários</MenuItem>
                    </Menu>
                </Box>
            </Paper>
        </Grid>
    )
}
