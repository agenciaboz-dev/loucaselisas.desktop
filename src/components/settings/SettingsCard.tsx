import React, { useState } from "react"
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

interface SettingCardProps {
    image?: string
    name: string
    plan?: boolean
    openEditModal: React.Dispatch<React.SetStateAction<boolean>>
    removeItem?: () => void
}

export const SettingsCard: React.FC<SettingCardProps> = ({ image, name, openEditModal, removeItem, plan = false }) => {
    const [onHover, setOnHover] = useState(false)

    return (
        <Paper onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} sx={{ w: 1, height: "3.5vw", p: "0.5vw" }}>
            <Box sx={{ w: 1, alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ gap: "0.5vw", flex: 1, alignItems: "center", width: "17.8vw" }}>
                    {!plan && <Avatar src={image} sx={{ width: "2.5vw", height: "2.5vw" }} />}
                    <Typography variant="body2" component="p" sx={{ fontSize: "1.1rem" }}>
                        {name}
                    </Typography>
                </Box>
                <Box sx={{ width: "5vw", height: 1, gap: "0.2vw", marginLeft: "auto" }}>
                    {onHover && (
                        <>
                            <IconButton onClick={removeItem}>
                                <DeleteIcon color="error" />
                            </IconButton>
                            <IconButton onClick={() => openEditModal(true)}>
                                <EditIcon color="primary" />
                            </IconButton>
                        </>
                    )}
                </Box>
            </Box>
        </Paper>
    )
}
