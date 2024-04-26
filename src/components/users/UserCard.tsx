import React from "react"
import { Avatar, Box, Chip, Grid, IconButton, MenuItem, Paper, Typography } from "@mui/material"
import { User } from "../../types/server/class"
import { useNavigate } from "react-router-dom"
import MoreVertIcon from "@mui/icons-material/MoreVert"

interface UserCardProps {
    user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    // const navigate = useNavigate()

    return (
        <>
            <Grid item xs={1}>
                <Paper sx={{ padding: "0.7vw" }}>
                    <MenuItem sx={{ flex: 1, justifyContent: "space-between", p: 0 }} onClick={() => console.log("teste 1")}>
                        <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                            <Avatar src={user.image || undefined} variant="circular" sx={{ width: "4.5vw", height: "4.5vw" }} />
                            <Box flexDirection="column" gap="0.5vw">
                                <Box>
                                    <Typography>{user.name}</Typography>
                                    <Typography>{user.birth}</Typography>
                                </Box>
                                <Box sx={{ gap: "0.3vw" }}>
                                    {user.admin && <Chip label="ADM" variant="outlined" sx={{ px: "0.5vw" }} />}
                                    {user.student && <Chip label="Estudante" variant="outlined" sx={{ px: "0.5vw" }} />}
                                    {user.creator && <Chip label="Criador de Conteudo" variant="outlined" sx={{ px: "0.5vw" }} />}
                                </Box>
                            </Box>
                        </Box>
                        <IconButton onClick={() => console.log("teste 2")}>
                            <MoreVertIcon />
                        </IconButton>
                    </MenuItem>
                </Paper>
            </Grid>
        </>
    )
}
