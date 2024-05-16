import React from "react"
import { Avatar, Box, MenuItem, Paper, Switch, Typography } from "@mui/material"
import placeholders from "../../tools/placeholders"
import { Category } from "../../types/server/class/Category"
import { Plan } from "../../types/server/class/Plan"
import { api } from "../../api/api"

interface SettingCardProps {
    category?: Category
    setCurrentCategory?: React.Dispatch<React.SetStateAction<Category>>
    image?: string
    name: string
    plan?: Plan
    setCurrentPlan?: React.Dispatch<React.SetStateAction<Plan>>
    openEditModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingsCard: React.FC<SettingCardProps> = ({ category, setCurrentCategory, image, name, openEditModal, plan, setCurrentPlan }) => {
    const onChangeCategoryStatus = async (checked: boolean) => {
        const data: Partial<Category> = { active: checked ? true : false, id: category?.id }

        const formData = new FormData()

        formData.append("data", JSON.stringify(data))

        try {
            console.log(data)
            const response = await api.patch("/category", formData)
            console.log({ Response: response.data })
        } catch (error) {
            console.log(error)
        }
    }

    const onChangePlanStatus = async (checked: boolean) => {
        const data: Partial<Plan> = { active: checked ? true : false, id: plan?.id }

        try {
            console.log(data)
            const response = await api.patch("/plan", data)
            console.log({ Response: response.data })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Paper sx={{ width: 1, height: "3.5vw", position: "relative" }}>
            <MenuItem
                onClick={() => {
                    if (category && setCurrentCategory) {
                        setCurrentCategory(category)
                    }
                    if (plan && setCurrentPlan) {
                        setCurrentPlan(plan)
                    }
                    openEditModal(true)
                }}
                sx={{ padding: "0.5vw", width: 1 }}
            >
                <Box sx={{ flex: 1, width: 1, justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ gap: "0.5vw", alignItems: "center" }}>
                        {!plan && <Avatar src={image || placeholders.square} sx={{ width: "2.5vw", height: "2.5vw" }} />}
                        <Typography variant="body2" component="p" sx={{ fontSize: "1.1rem" }}>
                            {name}
                        </Typography>
                    </Box>
                </Box>
            </MenuItem>
            <Box sx={{ position: "absolute", right: 0, height: 1, width: "fit-content", alignItems: "center" }}>
                <Switch
                    checked={category ? category?.active : plan?.active}
                    onChange={(_, checked) => (category ? onChangeCategoryStatus(checked) : onChangePlanStatus(checked))}
                />
            </Box>
        </Paper>
    )
}
