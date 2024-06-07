import React, { useEffect } from "react"
import { Box, Button, Modal, Paper, Typography } from "@mui/material"

interface DeleteConfirmProps {
    name: string
    openDeleteConfirm: boolean
    setopenModal: React.Dispatch<React.SetStateAction<boolean>>
    onConfirm: () => void
}

export const DeleteConfirm: React.FC<DeleteConfirmProps> = ({ name, openDeleteConfirm, setopenModal, onConfirm }) => {
    return (
        <Modal open={openDeleteConfirm} onClose={() => setopenModal(false)}>
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
                        <Typography variant="body2" component="h3" sx={{ fontSize: "1.5rem" }}>
                            Deseja realmente EXCLUIR esse tipo de usuário:
                        </Typography>

                        <Typography variant="subtitle1" component="p" sx={{ fontSize: "1.4rem", mt: "-0.5vw" }}>
                            {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                        </Typography>
                    </Box>
                    <Typography variant="body1" component="p">
                        Os usuários associados a esse tipo de usuário se tornarão do tipo{" "}
                        <span style={{ fontWeight: "bold" }}>Padrão</span>. Deseja mesmo continuar?
                    </Typography>
                    <Box sx={{ gap: "0.5vw", mt: "1vw" }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ borderRadius: "3vw" }}
                            onClick={() => {
                                setopenModal(false)
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ borderRadius: "3vw" }}
                            onClick={() => {
                                setopenModal(false)
                                onConfirm()
                            }}
                        >
                            Deletar
                        </Button>
                    </Box>
                </Paper>
                \
            </Box>
        </Modal>
    )
}
