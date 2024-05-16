import React, { useState } from "react"
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
    const [thisPlan, setThisPlan] = useState(plan)
    const [thisCategory, setThisCategory] = useState(category)

    const onChangeCategoryStatus = async (checked: boolean) => {
        const data: Partial<Category> = { active: checked ? true : false, id: category?.id }

        const formData = new FormData()

        formData.append("data", JSON.stringify(data))

        try {
            console.log(data)
            const response = await api.patch("/category", formData)
            setThisCategory(response.data)
            console.log({ Response: response.data })
        } catch (error) {
            console.log(error)
        }
    }

    const onChangePlanStatus = async (checked: boolean) => {
        const data: Partial<Plan> = { active: checked ? true : false, id: thisPlan?.id }

        try {
            console.log(data)
            const response = await api.patch("/plan", data)
            console.log({ Response: response.data })
            setThisPlan(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Paper sx={{ width: 1, height: "3.5vw", position: "relative" }}>
            <MenuItem
                onClick={() => {
                    if (thisCategory && setCurrentCategory) {
                        setCurrentCategory(thisCategory)
                    }
                    if (thisPlan && setCurrentPlan) {
                        setCurrentPlan(thisPlan)
                    }
                    openEditModal(true)
                }}
                sx={{ padding: "0.5vw", width: 1 }}
            >
                <Box sx={{ flex: 1, width: 1, justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ gap: "0.5vw", alignItems: "center" }}>
                        {!thisPlan && <Avatar src={image || placeholders.square} sx={{ width: "2.5vw", height: "2.5vw" }} />}
                        <Typography variant="body2" component="p" sx={{ fontSize: "1.1rem" }}>
                            {name}
                        </Typography>
                    </Box>
                </Box>
            </MenuItem>
            <Box sx={{ position: "absolute", right: 0, height: 1, width: "fit-content", alignItems: "center" }}>
                <Switch
                    checked={thisCategory ? thisCategory?.active : thisPlan?.active}
                    onChange={(_, checked) => (thisCategory ? onChangeCategoryStatus(checked) : onChangePlanStatus(checked))}
                />
            </Box>
        </Paper>
    )
}
