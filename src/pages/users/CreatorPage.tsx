import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, Grid, IconButton, MenuItem, Paper, Switch, Tab, Tabs, TextField, Typography } from "@mui/material"
import { Form, useLocation } from "react-router-dom"
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
import { Lesson } from "../../types/server/class/Course/Lesson"
import { NoFeaturedContent } from "../../components/dashboard/NoFeaturedContent"
import { useFormik } from "formik"
import * as Yup from "yup"
import { PartialUser } from "../../types/server/class/User"
interface CreatorPageProps {}

interface MessageItem {
    message: Message
    course: Course
}

type Messages = MessageItem[]

// type data = [...Course[], ...Lesson[]]

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
    const [user, setuser] = useState(location.state.user as User | undefined)
    const id = user ? user?.id : userId
    const [creator, setCreator] = useState(user?.creator)
    // console.log({ User: user })
    // console.log({ Creator: creator })
    // console.log(creator?.id)

    const [loading, setLoading] = useState(false)

    const [statistic, setStatistic] = useState<{ views: number; downloads: number; likes: number; messages: number }>()
    const [userTypes, setUserTypes] = useState<Role[]>([])
    const [messages, setMessages] = useState<Messages>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [currentTab, setCurrentTab] = useState(1)

    const required_message = "Campo obrigatório"
    const validateSchema = Yup.object().shape({
        role: Yup.number().min(1, required_message),
    })

    const formik = useFormik<PartialUser>({
        initialValues: { id: user!.id, role: user?.role.id },
        onSubmit: async (values) => {
            if (loading) return
            setLoading(true)

            try {
                console.log(values)
                const response = await api.patch("/user", values)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 300)
            }
        },
        validationSchema: validateSchema,
    })

    const fetchUser = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/user", { params: { id: id } })
            setuser(response.data)
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
            <HeaderInfo
                title={creator ? `Informações do criador de conteúdo` : `Informações do usuário`}
                refreshButton={false}
                exitButton={false}
                backButton
            />
            <Box sx={{ gap: "1vw", height: 1 }}>
                <Box sx={{ height: 1, maxWidth: "23.6vw", flexDirection: "column", justifyContent: "space-between", gap: "0.5vw", flex: 1 }}>
                    <ColumnTitle prop="Nome:" value={creator ? creator?.nickname : user.username} />
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Paper sx={{ borderRadius: "1vw" }}>
                            <Avatar
                                src={(creator ? creator.cover : user.cover) || placeholders.landscape}
                                sx={{ width: "23.6vw", height: "13.27vw", borderRadius: "1vw" }}
                            >
                                <Avatar src={placeholders.landscape} />
                            </Avatar>
                        </Paper>
                        <Box sx={{ alignItems: "center", justifyContent: "space-between", marginTop: "-2.5vw" }}>
                            <Avatar src={(creator ? creator.image : user.image) || placeholders.avatar} sx={{ width: "6vw", height: "6vw" }}>
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
                            <form onSubmit={formik.handleSubmit}>
                                <TextField //todo finalizar a função de seleção
                                    name="role"
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    InputProps={{ sx: { height: "1.7vw", width: "12.5vw" } }}
                                    SelectProps={{ MenuProps: { MenuListProps: { sx: { width: 1 } } }, multiline: true }}
                                    select
                                    error={formik.touched.role && Boolean(formik.errors.role)}
                                    helperText={formik.touched.role && formik.errors.role}
                                >
                                    {userTypes.map((type) => (
                                        <MenuItem value={type.id} key={type.id}>
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Button type="submit" variant="contained" sx={{ height: "1.7vw", padding: 0, borderRadius: "3vw" }}>
                                    Salvar
                                </Button>
                            </form>
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
                                {(creator ? creator?.description : user.bio) || "Não há descrição a ser exibida"}
                            </Typography>
                        </Box>
                    </Box>
                    {creator ? (
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
                    ) : (
                        <Box sx={{ flexDirection: "column", gap: "1vw", height: "6vw", marginTop: "auto" }}></Box>
                    )}
                </Box>
                {creator ? (
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
                ) : (
                    <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                        <ColumnTitle prop="Últimos comentários" sx={{ width: 1 }} />
                        <Grid container spacing={3} sx={{ width: "53vw" }}>
                            {messages.length > 0 ? (
                                messages.map((item) => (
                                    <Grid item xs={6}>
                                        <MessageCard key={item.message.id} message={item.message} course={item.course} sx={{ height: "100%" }} />
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12} sx={{ height: "69vh" }}>
                                    <NoFeaturedContent title="Não há comentários a serem exibidos" text="" />
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                )}
            </Box>
        </Box>
    ) : null
}
