import React from "react"
import { Box, Modal, Paper, Typography } from "@mui/material"

interface ReproveModalProps {
    name: string
    type: "course" | "lesson"
    openReproveModal: boolean
    handleOpenReproveModal: () => void
    onSubmit?: () => void
}

export const ReproveModal: React.FC<ReproveModalProps> = ({ name, type, openReproveModal, handleOpenReproveModal, onSubmit }) => {
    return <Box></Box>
}
