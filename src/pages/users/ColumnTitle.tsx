import React from "react"
import { Typography } from "@mui/material"

interface ColumnTitleProps {
    prop: string
    value?: string
}

export const ColumnTitle: React.FC<ColumnTitleProps> = ({ prop, value }) => {
    return (
        <Typography variant="body1" component="p" sx={{ fontSize: "1.3rem" }}>
            {prop} {value}
        </Typography>
    )
}
