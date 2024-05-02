import React from "react"
import { Avatar, Box, Chip, Grid, IconButton, MenuItem, Paper, Typography } from "@mui/material"
import { User } from "../../types/server/class"
import { useNavigate } from "react-router-dom"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import zIndex from "@mui/material/styles/zIndex"

interface UserCardProps {
    user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    // const navigate = useNavigate()

    return (
        <>
            <Grid item xs={1}>
                <Paper sx={{ position: "relative" }}>
                    <MenuItem sx={{ flex: 1, justifyContent: "space-between", p: "0.7vw" }} onClick={() => console.log("teste 1")}>
                        <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                            <Avatar src={user.image || undefined} variant="circular" sx={{ width: "4.5vw", height: "4.5vw" }} />
                            <Box flexDirection="column" gap="0.5vw">
                                <Box>
                                    <Typography variant="subtitle1" component="h4">
                                        {user.name}
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                        {user.birth}
                                    </Typography>
                                </Box>
                                <Box sx={{ gap: "0.3vw" }}>
                                    {user.admin && <Chip label="ADM" variant="outlined" sx={{ px: "0.5vw" }} />}
                                    {user.student && <Chip label="Estudante" variant="outlined" sx={{ px: "0.5vw" }} />}
                                    {user.creator && <Chip label="Criador de Conteudo" variant="outlined" sx={{ px: "0.5vw" }} />}
                                </Box>
                            </Box>
                        </Box>
                    </MenuItem>
                    <IconButton
                        onClick={() => console.log("teste 2")}
                        sx={{
                            height: "2vw",
                            p: "0.2vw",
                            mr: "0.5vw",
                            minHeight: 0,
                            position: "absolute",
                            right: 0,
                            top: "calc( 50% - 1vw)",
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Paper>
            </Grid>
        </>
    )
}
