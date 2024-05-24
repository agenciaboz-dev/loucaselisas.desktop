import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, Grid, IconButton, Paper, TextField, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import { User } from "../../types/server/class"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined"
import placeholders from "../../tools/placeholders"
import { api } from "../../api/api"

interface CreatorPageProps {}

export const CreatorPage: React.FC<CreatorPageProps> = ({}) => {
    const location = useLocation()
    const [user, setuser] = useState(location.state.user as User)
    const creator = user.creator

    const [loading, setloading] = useState(false)

    const [statistic, setStatistic] = useState<{ views: number; downloads: number; likes: number; messages: number }>()

    const fetchStatistic = async () => {
        if (loading) return
        setloading(true)

        try {
            const response = await api.get("/creator/statistics", { params: { creator_id: creator?.id } })
            setStatistic(response.data)
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setloading(false)
            }, 300)
        }
    }

    useEffect(() => {
        fetchStatistic()
    }, [])

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "76vw", height: "71.6vh" }}>
            <HeaderInfo title={`Informações do criador de conteúdo`} refreshButton={false} exitButton={false} backButton />
            <Box sx={{ gap: "1vw", height: 1 }}>
                <Box sx={{ height: 1, width: "25vw", maxWidth: "23.6vw", flexDirection: "column", justifyContent: "space-between", gap: "0.5vw" }}>
                    <Typography variant="body1" component="p" sx={{ fontSize: "1.3rem" }}>
                        Nome: {creator?.nickname}
                    </Typography>
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Paper sx={{ borderRadius: "1vw" }}>
                            <Avatar
                                src={(creator ? creator.cover : user.cover) || placeholders.landscape}
                                sx={{ width: "23.6vw", height: "13.27vw", borderRadius: "1vw" }}
                            >
                                <Avatar src={placeholders.landscape} />
                            </Avatar>
                        </Paper>
                        <Avatar
                            src={(creator ? creator.image : user.image) || placeholders.avatar}
                            sx={{ width: "6vw", height: "6vw", marginTop: "-4vw" }}
                        >
                            <Avatar src={placeholders.avatar} />
                        </Avatar>
                        <Box sx={{ marginLeft: "auto", marginTop: "-3.5vw", gap: "0.5vw", alignItems: "center" }}>
                            <TextField InputProps={{ sx: { height: "1.7vw", width: "9vw" } }} sx={{}} />
                            <Button variant="contained" sx={{ height: "1.7vw", padding: 0, borderRadius: "3vw" }}>
                                Salvar
                            </Button>
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
                        <Box>
                            <Typography sx={{ textAlign: "right", maxWidth: "23.6vw", flex: 1 }}>{creator?.description}</Typography>
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
                            <Box sx={{ flex: 1, border: "1px solid red", height: "3vw", flexDirection: "column", alignItems: "center" }}>
                                <Box sx={{ gap: "0.5vw" }}>
                                    <Typography>{statistic?.views}</Typography> <VisibilityOutlinedIcon />
                                </Box>
                                <Typography>Visualizados</Typography>
                            </Box>
                            <Box sx={{ flex: 1, border: "1px solid red", height: "3vw", flexDirection: "column", alignItems: "center" }}>
                                <Box sx={{ gap: "0.5vw" }}>
                                    <Typography>{statistic?.likes}</Typography> <FavoriteBorderOutlinedIcon />
                                </Box>
                                <Typography>Favoritados</Typography>
                            </Box>
                            <Box sx={{ flex: 1, border: "1px solid red", height: "3vw", flexDirection: "column", alignItems: "center" }}>
                                <Box sx={{ gap: "0.5vw" }}>
                                    <Typography>{statistic?.messages}</Typography> <MessageOutlinedIcon />
                                </Box>
                                <Typography>Mensagens</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                <Grid container spacing={3} columns={2} sx={{}}>
                    <Grid item xs={1}>
                        <Box sx={{ flex: 1, border: "1px solid red" }}></Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{ flex: 1, border: "1px solid red" }}></Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
