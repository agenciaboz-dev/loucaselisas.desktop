import React from "react"
import { Box, Button, Modal, Paper, Typography } from "@mui/material"

interface AproveModalProps {
    name: string
    type: "course" | "lesson"
    openAproveModal: boolean
    handleOpenAproveModal: () => void
    onSubmit?: () => void
}

export const AproveModal: React.FC<AproveModalProps> = ({ name, type, openAproveModal, handleOpenAproveModal, onSubmit }) => {
    return (
        <Modal open={openAproveModal} onClose={handleOpenAproveModal}>
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
                                Deseja realmente APROVAR essa Lição:
                            </Typography>
                        )}
                        {type === "course" && (
                            <Typography variant="body2" component="h3" sx={{ fontSize: "1.5rem" }}>
                                Deseja realmente APROVAR esse Curso:
                            </Typography>
                        )}
                        <Typography variant="subtitle1" component="p" sx={{ fontSize: "1.4rem", mt: "-0.5vw" }}>
                            {name}
                        </Typography>
                    </Box>
                    <Typography variant="body1" component="p">
                        Este conteúdo ficará disponível para todos os usuários cadastrados como estudantes. Deseja mesmo continuar?
                    </Typography>
                    <Box sx={{ gap: "0.5vw", mt: "1vw" }}>
                        <Button fullWidth variant="outlined" sx={{ borderRadius: "3vw" }} onClick={handleOpenAproveModal}>
                            Cancelar
                        </Button>
                        <Button fullWidth variant="contained" sx={{ borderRadius: "3vw" }} onClick={onSubmit}>
                            Aprovar
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Modal>
    )
}
