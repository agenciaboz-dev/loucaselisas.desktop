import React, { useState } from "react"
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import placeholders from "../../tools/placeholders"
import { Category } from "../../types/server/class/Category"

interface SettingCardProps {
    category?: Category
    setCurrentCategory?: React.Dispatch<React.SetStateAction<Category>>
    image?: string
    name: string
    plan?: boolean
    openEditModal: React.Dispatch<React.SetStateAction<boolean>>
    removeItem?: () => void
}

export const SettingsCard: React.FC<SettingCardProps> = ({ category, setCurrentCategory, image, name, openEditModal, removeItem, plan = false }) => {
    const [onHover, setOnHover] = useState(false)

    return (
        <Paper onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} sx={{ width: 1, height: "3.5vw", p: "0.5vw" }}>
            <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ gap: "0.5vw", flex: 1, alignItems: "center", width: "17.8vw" }}>
                    {!plan && <Avatar src={image || placeholders.square} sx={{ width: "2.5vw", height: "2.5vw" }} />}
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
                            <IconButton
                                onClick={() => {
                                    if (category && setCurrentCategory) {
                                        setCurrentCategory(category)
                                    }
                                    openEditModal(true)
                                }}
                            >
                                <EditIcon color="primary" />
                            </IconButton>
                        </>
                    )}
                </Box>
            </Box>
        </Paper>
    )
}
