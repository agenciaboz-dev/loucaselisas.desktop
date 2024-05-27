import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, Grid, IconButton, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import { User } from "../../types/server/class"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined"
import placeholders from "../../tools/placeholders"
import { api } from "../../api/api"
import { StatisticsView } from "./StatisticsView"
import { Role } from "../../types/server/class/Role"
import { Message } from "../../types/server/class/Chat/Message"
import { MessageCard } from "./MessageCard"
import { Course } from "../../types/server/class/Course"
import { ColumnTitle } from "./ColumnTitle"
import { DataCard } from "../../components/courses/DataCard"
import { slugify } from "../../tools/urlMask"

interface CreatorPageProps {}

export const CreatorPage: React.FC<CreatorPageProps> = ({}) => {
    const gridColumnStyle = {
        height: "71.6vh",
        flexDirection: "column",
        padding: "0 0.1vw",
        gap: "0.5vw",
        overflow: "scroll",
    }

    const location = useLocation()
    const userId = location.state.userId as string | undefined
    const [user, setuser] = useState(location.state.user as User)
    const id = user ? user?.id : userId

    const creator = user.creator

    const [loading, setLoading] = useState(false)

    const [statistic, setStatistic] = useState<{ views: number; downloads: number; likes: number; messages: number }>()
    const [userTypes, setUserTypes] = useState<Role[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [coursesById, setCoursesById] = useState<Course[]>([])

    const fetchUsersTypes = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await api.get("/user/types")
            setUserTypes(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    const fetchStatistic = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await api.get("/creator/statistics", { params: { creator_id: creator?.id } })
            setStatistic(response.data)
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    }

    const fetchMessages = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/user/message", { params: { user_id: user.id } })
            setMessages(response.data)
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            })
        }
    }

    const fetchCoursesByUserId = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/course/user", { params: { user_id: id } })
            setCoursesById(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    }

    const fetchUser = async (id: string | undefined) => {
        try {
            const response = await api.get("/user", { params: { id: id } })
            setuser(response.data)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchStatistic()
        fetchMessages()
        fetchUsersTypes()
        fetchCoursesByUserId()
        fetchUser(id)
    }, [])

    // useEffect(() => {
    //     if (user) setUser
    // }, [user])

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "76vw", height: "71.6vh" }}>
            <HeaderInfo title={`Informações do criador de conteúdo`} refreshButton={false} exitButton={false} backButton />
            <Box sx={{ gap: "1vw", height: 1 }}>
                <Box sx={{ height: 1, maxWidth: "23.6vw", flexDirection: "column", justifyContent: "space-between", gap: "0.5vw" }}>
                    <ColumnTitle prop="Nome:" value={creator?.nickname} />
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
                            <TextField //todo finalizar a função de seleção
                                InputProps={{ sx: { height: "1.7vw", width: "9vw" } }}
                                SelectProps={{ MenuProps: { MenuListProps: { sx: { width: 1 } } }, multiline: true }}
                                select
                            >
                                {userTypes.map((type) => (
                                    <MenuItem value={type.id} key={type.id}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button variant="contained" sx={{ height: "1.7vw", padding: 0, borderRadius: "3vw" }}>
                                Salvar
                            </Button>
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    textAlign: "right",
                                    maxWidth: "23.6vw",
                                    flex: 1,
                                    height: "13vw",
                                    maxHeight: "10.8vw",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "normal",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 9,
                                }}
                            >
                                {creator?.description}
                            </Typography>
                        </Box>
                    </Box>
                    <Paper sx={{ flexDirection: "column", gap: "1vw", height: "6vw", marginTop: "auto" }}>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{ marginTop: "1vw", lineHeight: "1vw", alignSelf: "center", fontSize: "1.3rem", fontWeight: 500 }}
                        >
                            Estatísticas
                        </Typography>
                        <Box>
                            <StatisticsView statistic={statistic?.views} icon={<VisibilityOutlinedIcon />} text="Visualizados" />
                            <StatisticsView statistic={statistic?.likes} icon={<FavoriteBorderOutlinedIcon />} text="Favoritados" />
                            <StatisticsView statistic={statistic?.messages} icon={<MessageOutlinedIcon />} text="Mensagens" />
                        </Box>
                    </Paper>
                </Box>
                <Grid container spacing={3} columns={2} sx={{}}>
                    <Grid item xs={1}>
                        <Box sx={gridColumnStyle}>
                            <ColumnTitle prop="Ultímos Comentários" />
                            {messages.map((message) => (
                                <MessageCard key={message.id} message={message} user={user} />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box
                            sx={{
                                ...gridColumnStyle,
                            }}
                        >
                            <ColumnTitle prop="Cursos e Lições" />
                            {coursesById.map((course) => (
                                <Box key={course.id} sx={{ flexDirection: "column", gap: "1vw" }}>
                                    <DataCard
                                        // key={course.id}
                                        description={course.description}
                                        downloads={course.downloads}
                                        image={course.cover}
                                        likes={course.likes}
                                        title={course.name}
                                        views={course.views}
                                        messages={course.chat?.messages}
                                        link={`/cursos/${slugify(course.name)}`}
                                        routerParam={course}
                                        sx={{ width: "24.55vw" }}
                                    />
                                    {/* <Button
                                        onClick={() => {
                                            fetchUser(course.owner.user_id)
                                        }}
                                    >
                                        buscar
                                    </Button> */}
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
