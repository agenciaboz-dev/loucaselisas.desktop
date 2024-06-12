import React from "react"
import { Box, IconButton, Paper } from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"

interface DeleteMessageProps {}

export const DeleteMessage: React.FC<DeleteMessageProps> = ({}) => {
    return (
        <Paper sx={{ borderRadius: "2vw" }}>
            <IconButton>
                <DeleteOutlineIcon />
            </IconButton>
        </Paper>
    )
}
