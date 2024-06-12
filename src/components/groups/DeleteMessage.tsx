import React from "react"
import { Box, IconButton, Paper } from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { api } from "../../api/api"

interface DeleteMessageProps {
    deleteMessage: () => void
}

export const DeleteMessage: React.FC<DeleteMessageProps> = ({ deleteMessage }) => {
    return (
        <Paper sx={{ borderRadius: "2vw" }}>
            <IconButton onClick={() => deleteMessage()}>
                <DeleteOutlineIcon />
            </IconButton>
        </Paper>
    )
}
