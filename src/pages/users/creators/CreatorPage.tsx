import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, CircularProgress, Grid, MenuItem, Paper, Switch, Tab, Tabs, TextField, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { HeaderInfo } from "../../../components/header/HeaderInfo"
import { User } from "../../../types/server/class"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined"
import placeholders from "../../../tools/placeholders"
import { api } from "../../../api/api"
import { StatisticsView } from "../StatisticsView"
import { Role } from "../../../types/server/class/Role"
import { Message } from "../../../types/server/class/Chat/Message"
import { MessageCard } from "../MessageCard"
import { Course } from "../../../types/server/class/Course"
import { ColumnTitle } from "../ColumnTitle"
import { DataCard } from "../../../components/courses/DataCard"
import { slugify } from "../../../tools/urlMask"
import { Lesson } from "../../../types/server/class/Course/Lesson"
interface CreatorPageProps {}

interface MessageItem {
    message: Message
    course: Course
}

type Messages = MessageItem[]

export const CreatorPage: React.FC<CreatorPageProps> = ({}) => {
    const gridColumnStyle = {
        height: "69.5vh",
        flexDirection: "column",
        padding: "0.1vw 0.2vw 0.7vw",
        gap: "0.5vw",
        overflow: "scroll",
    }

    const location = useLocation()
    const userId = location.state.userId as string | undefined
    const [user, setUser] = useState(location.state.user as User | undefined)
    const id = user ? user?.id : userId
    const [creator, setCreator] = useState(user?.creator)

    const [loading, setLoading] = useState(false)

    const [statistic, setStatistic] = useState<{ views: number; downloads: number; likes: number; messages: number }>()
    const [userTypes, setUserTypes] = useState<Role[]>([])
    const [messages, setMessages] = useState<Messages>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [currentTab, setCurrentTab] = useState(1)

    const [selectedRole, setSelectedRole] = useState<Role>()

    const onSubmit = async (value: Role) => {
        if (loading) return
        setLoading(true)

        try {
            console.log(value)
            const response = await api.patch("/user", { role: value, id: user?.id })
            console.log(response.data)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    }

    const fetchUser = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/user", { params: { id: id } })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    }

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
            }, 300)
        }
    }

    const fetchStatistic = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await api.get("/creator/statistics", { params: { creator_id: creator?.id } })
            setStatistic(response.data)
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
            const response = await api.get("/user/messages", { params: { user_id: id } })
            setMessages(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    }

    const fetchCourses = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/course/owner", { params: { owner_id: creator?.id } })
            setCourses(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    }

    const fetchLessons = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/creator/lessons", { params: { creator_id: creator?.id } })
            setLessons(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            fetchMessages()
            fetchUsersTypes()
            setCreator(user.creator)
            setSelectedRole(user.role)
        }
    }, [user])

    useEffect(() => {
        if (creator) {
            fetchStatistic()
            fetchCourses()
            fetchLessons()
        }
    }, [creator])

    return user ? (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "76vw", height: "71.6vh" }}>
            <HeaderInfo title={`Informações do criador de conteúdo`} refreshButton={false} exitButton={false} backButton />
            <Box sx={{ gap: "1vw", height: 1 }}>
                <Box sx={{ height: 1, maxWidth: "23.6vw", flexDirection: "column", justifyContent: "space-between", gap: "0.5vw", flex: 1 }}>
                    <ColumnTitle prop="Nome:" value={creator?.nickname} />
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Paper sx={{ borderRadius: "1vw" }}>
                            <Avatar src={creator?.cover || placeholders.landscape} sx={{ width: "23.6vw", height: "13.27vw", borderRadius: "1vw" }}>
                                <Avatar src={placeholders.landscape} />
                            </Avatar>
                        </Paper>
                        <Box sx={{ alignItems: "center", justifyContent: "space-between", marginTop: "-2.5vw" }}>
                            <Avatar src={creator?.image || placeholders.avatar} sx={{ width: "6vw", height: "6vw" }}>
                                <Avatar src={placeholders.avatar} />
                            </Avatar>
                            <Box sx={{ alignItems: "center", justifyContent: "end" }}>
                                <Typography variant="body1" component="p">
                                    Tornar um usuário um criador de conteúdo
                                </Typography>
                                <Switch />
                            </Box>
                        </Box>
                        <Box sx={{ marginLeft: "auto", gap: "0.5vw", alignItems: "center", marginTop: "-3vw" }}>
                            {selectedRole && (
                                <>
                                    <TextField
                                        name="selectedRole"
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(userTypes.find((item) => item.id.toString() == e.target.value))}
                                        InputProps={{ sx: { height: "1.7vw", width: "12.5vw" } }}
                                        SelectProps={{
                                            MenuProps: { MenuListProps: { sx: { width: 1 } } },
                                            renderValue: (selected: Role) => selected.name,
                                        }}
                                        select
                                    >
                                        {userTypes.map((type) => (
                                            <MenuItem value={type.id} key={type.id}>
                                                {type.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <Button
                                        onClick={() => onSubmit(selectedRole)}
                                        variant="contained"
                                        sx={{ height: "1.7vw", padding: 0, borderRadius: "3vw" }}
                                    >
                                        {loading ? <CircularProgress /> : "Salvar"}
                                    </Button>
                                </>
                            )}
                        </Box>
                        <Box>
                            <Typography
                                sx={{
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
                                {creator?.description || "Não há descrição a ser exibida"}
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
                        <ColumnTitle prop="Ultímos Comentários" />
                        <Box sx={{ ...gridColumnStyle }}>
                            {messages.map((item) => (
                                <MessageCard key={item.message.id} message={item.message} course={item.course} sx={{ width: "24.4vw" }} />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Tabs value={currentTab} onChange={(_, value) => setCurrentTab(value)} variant="fullWidth">
                            <Tab value={1} label="Cursos" />
                            <Tab value={2} label="Lessons" />
                        </Tabs>
                        <Box
                            sx={{
                                ...gridColumnStyle,
                                pt: "0.2vw",
                                pb: "1.6vw",
                            }}
                        >
                            {currentTab === 1 &&
                                courses.map((course) => (
                                    <DataCard
                                        key={course.id}
                                        course={course}
                                        image={course.cover}
                                        title={course.name}
                                        description={course.description}
                                        likes={course.likes}
                                        downloads={course.downloads}
                                        messages={course.chat?.messages}
                                        views={course.views}
                                        link={`/cursos/${slugify(course.name)}`}
                                        routerParam={course}
                                        sx={{ width: "24.4vw" }}
                                    />
                                ))}
                            {currentTab === 2 &&
                                lessons.map((lesson) => (
                                    <DataCard
                                        key={lesson.id}
                                        lesson={lesson}
                                        image={lesson.thumb || lesson.media.url}
                                        title={lesson.name}
                                        description={lesson.info}
                                        likes={lesson.likes}
                                        downloads={lesson.downloads}
                                        views={lesson.views}
                                        userName={lesson.course.name}
                                        link={`/licoes/${slugify(lesson.name)}`}
                                        routerParam={{ lesson }}
                                        sx={{ width: "24.4vw" }}
                                    />
                                ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    ) : null
}
