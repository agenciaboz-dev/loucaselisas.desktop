import React from "react"
import { Avatar, Box, Typography } from "@mui/material"

interface DataCardProps {
    image: string
    name: string
    description: string
    time?: number
}

export const DataCard: React.FC<DataCardProps> = ({ image, description, name, time }) => {
    return <Box></Box>
}
