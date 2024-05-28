import React from "react"
import { SxProps, Typography } from "@mui/material"

interface ColumnTitleProps {
    prop: string
    value?: string
    sx?: SxProps
}

export const ColumnTitle: React.FC<ColumnTitleProps> = ({ prop, value, sx }) => {
    return (
        <Typography variant="body1" component="p" sx={{ fontSize: "1.3rem", ...sx }}>
            {prop} {value}
        </Typography>
    )
}
