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
    return (
        <Modal open={openReproveModal} onClose={handleOpenReproveModal}>
            <Box sx={{ width: "100%", height: "100vh", justifyContent: "center", alignItems: "center" }}>
                <Paper
                    sx={{
                        width: "35vw",
                        h: 1,
                        p: "1vw",
                        flexDirection: "column",
                        gap: "0.5vw",
                        borderRadius: "1vw",
                    }}
                >
                    <Box sx={{ flexDirection: "column" }}>
                        {type === "lesson" && (
                            <Typography variant="body2" component="h3" sx={{ fontSize: "1.5rem" }}>
                                Deseja realmente Reprovar essa Lição:
                            </Typography>
                        )}
                        {type === "course" && (
                            <Typography variant="body2" component="h3" sx={{ fontSize: "1.5rem" }}>
                                Deseja realmente Reprovar esse Curso:
                            </Typography>
                        )}
                        <Typography variant="subtitle1" component="p" sx={{ fontSize: "1.4rem" }}>
                            {name}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Modal>
    )
}
