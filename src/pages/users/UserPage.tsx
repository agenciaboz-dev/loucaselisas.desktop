import React, { useState } from "react"
import { Avatar, Box, Button, Grid, IconButton, Paper, TextField, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import { User } from "../../types/server/class"
import MoreVertIcon from "@mui/icons-material/MoreVert"

interface UserPageProps {}

export const UserPage: React.FC<UserPageProps> = ({}) => {
    const location = useLocation()
    const [user, setuser] = useState(location.state.user as User)
    console.log(user)

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "76vw", height: "74vh" }}>
            <HeaderInfo title={`Usuário: ${user.name}`} refreshButton={false} exitButton={false} backButton />
            <Box sx={{ gap: "1vw" }}>
                <Box sx={{ height: 1, flexDirection: "column", justifyContent: "space-between" }}>
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Paper sx={{ borderRadius: "1vw" }}>
                            <Avatar src={user.cover || undefined} sx={{ width: "23.6vw", height: "13.27vw", borderRadius: "1vw" }} />
                        </Paper>
                        <Avatar src={user.image || undefined} sx={{ width: "6vw", height: "auto", marginTop: "-4vw" }} />
                        <Box sx={{ marginLeft: "auto", marginTop: "-3.5vw", gap: "0.5vw", alignItems: "center" }}>
                            <TextField InputProps={{ sx: { height: "1.7vw", width: "9vw" } }} sx={{}} select />
                            <Button variant="contained" sx={{ height: "1.7vw", padding: 0, borderRadius: "3vw" }}>
                                Salvar
                            </Button>
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
                        <Box>
                            <Typography sx={{ textAlign: "right" }}>{user.bio}</Typography>
                        </Box>
                    </Box>
                    <Paper sx={{ flexDirection: "column", gap: "1vw", height: "6vw", marginTop: "auto" }}>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{ marginTop: "1vw", lineHeight: "1vw", alignSelf: "center", fontSize: "1.3rem" }}
                        >
                            Estatísticas
                        </Typography>
                        <Box>
                            <Box sx={{ flex: 1, border: "1px solid red", height: "3vw" }}></Box>
                            <Box sx={{ flex: 1, border: "1px solid red", height: "3vw" }}></Box>
                            <Box sx={{ flex: 1, border: "1px solid red", height: "3vw" }}></Box>
                        </Box>
                    </Paper>
                </Box>
                <Grid container spacing={3} columns={user.creator ? 2 : 1} sx={{}}>
                    <Grid item xs={1}>
                        <Box sx={{ flex: 1, border: "1px solid red" }}></Box>
                    </Grid>
                    {user.creator && (
                        <Grid item xs={1}>
                            <Box sx={{ flex: 1, border: "1px solid red" }}></Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    )
}
