import React, { SetStateAction } from "react"
import { Box, Modal, Paper, Typography } from "@mui/material"

interface AproveModalProps {
    name: string
    type: "course" | "lesson"
    openAproveModal: boolean
    handleOpenAproveModal: () => void
}

export const AproveModal: React.FC<AproveModalProps> = ({ name, type, openAproveModal, handleOpenAproveModal }) => {
    return (
        <Modal open={openAproveModal} onClose={handleOpenAproveModal}>
            <Paper sx={{ width: "fit-content", h: 1, position: "absolute", top: "30vh", left: "65vw", p: "1vw" }}>
                {type === "lesson" && <Typography>Deseja realmente APROVAR essa Lição:</Typography>}
                {type === "course" && <Typography>Deseja realmente APROVAR esse Curso:</Typography>}
                <Typography>{name}</Typography>
            </Paper>
        </Modal>
    )
}
