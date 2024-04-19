import React, { useState } from "react"
import { Box, Chip } from "@mui/material"
import { Course } from "../../types/server/class/Course"
import { Category } from "../../types/server/class/Category"
import { api } from "../../api/api"

interface FiltersProps {
    filter?: (course: Course[]) => void
    courses?: Course[]
}

export const Filters: React.FC<FiltersProps> = ({}) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)

    const getCategories = async () => {
        setLoading(true)
        try {
            const response = await api.get("/category/list")
            setCategories(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{}}>
            <Chip label="Mais vistos" />
        </Box>
    )
}
