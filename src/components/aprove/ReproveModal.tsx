import React, { useState } from "react"
import { Box, Button, Modal, Paper, TextField, Typography } from "@mui/material"

interface ReproveModalProps {
    name: string
    type: "course" | "lesson"
    openReproveModal: boolean
    handleOpenReproveModal: () => void
    onConfirm: (reason: string) => void
}

export const ReproveModal: React.FC<ReproveModalProps> = ({ name, type, openReproveModal, handleOpenReproveModal, onConfirm }) => {
    const [reason, setReason] = useState<string>("")

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
                    <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
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
                            <Typography variant="subtitle1" component="p" sx={{ fontSize: "1.4rem", mt: "-0.5vw" }}>
                                {name}
                            </Typography>
                        </Box>
                        <Box sx={{ flexDirection: "column" }}>
                            <Typography>Motivo da reprovação (Opcional)</Typography>
                            <TextField fullWidth minRows={3} multiline value={reason} onChange={(e) => setReason(e.target.value)} />
                        </Box>
                        <Box sx={{ gap: "0.5vw", mt: "1vw" }}>
                            <Button fullWidth variant="outlined" sx={{ borderRadius: "3vw" }} onClick={handleOpenReproveModal}>
                                Cancelar
                            </Button>
                            <Button fullWidth variant="contained" sx={{ borderRadius: "3vw" }} onClick={() => onConfirm(reason)}>
                                Reprovar
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Modal>
    )
}
