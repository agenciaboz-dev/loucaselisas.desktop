import React from "react"
import { Avatar, Box, Chip, Grid, IconButton, MenuItem, Paper, Typography } from "@mui/material"
import { User } from "../../types/server/class"
import { useNavigate } from "react-router-dom"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import placeholders from "../../tools/placeholders"

interface UserCardProps {
    user: User
    creator?: boolean
    link: string
    routerParam: User
}

export const UserCard: React.FC<UserCardProps> = ({ creator = false, user, link, routerParam }) => {
    const navigate = useNavigate()
    return (
        <Grid item xs={1}>
            <Paper sx={{ position: "relative", height: "100%", width: "100%" }}>
                <MenuItem
                    sx={{ flex: 1, justifyContent: "space-between", p: "0.7vw", width: "100%" }}
                    onClick={() => {
                        navigate(link, { state: { user: routerParam } })
                    }}
                >
                    <Box sx={{ alignItems: "center", gap: "0.5vw", flex: 1, overflow: "hidden" }}>
                        <Avatar
                            src={(creator ? user.creator?.image : user.image) || placeholders.avatar || undefined}
                            variant="circular"
                            sx={{ width: "4.5vw", height: "4.5vw" }}
                        />
                        <Box sx={{ flexDirection: "column", gap: "0.5vw", flex: 1 }}>
                            <Box
                                sx={{
                                    gap: "0.5vw",
                                    alignItems: "center",
                                    flex: 1,
                                    maxWidth: "18vw",
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    sx={{
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                    }}
                                >
                                    {creator ? user.creator?.nickname : user.name}
                                </Typography>
                                {user.created_at && (
                                    <Box sx={{ gap: "0.5vw" }}>
                                        <Typography variant="body1" component="p">
                                            -
                                        </Typography>
                                        <Typography variant="body1" component="p">
                                            {new Date(Number(user.created_at)).toLocaleDateString("pt-br")}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                            <Box sx={{ gap: "0.3vw", flexWrap: "wrap", maxWidth: "90%" }}>
                                {user.admin && <Chip label="ADM" variant="outlined" sx={{ px: "0.5vw" }} />}
                                {user.creator && <Chip label="Criador de Conteúdo" variant="outlined" sx={{ px: "0.5vw" }} />}
                                {user.student && <Chip label="Estudante" variant="outlined" sx={{ px: "0.5vw" }} />}
                            </Box>
                        </Box>
                    </Box>
                </MenuItem>
                {/* <IconButton
                    onClick={() => {}}
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
                </IconButton> */}
            </Paper>
        </Grid>
    )
}
