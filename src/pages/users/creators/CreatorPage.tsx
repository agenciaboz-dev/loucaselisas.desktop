import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, CircularProgress, MenuItem, Paper, Skeleton, Switch, Tab, Tabs, TextField, Typography } from "@mui/material"
import { useLocation, useSearchParams } from "react-router-dom"
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
import { NoFeaturedContent } from "../../../components/dashboard/NoFeaturedContent"
import { PartialUser } from "../../../types/server/class/User"
interface CreatorPageProps {}

interface MessageItem {
    message: Message
    course: Course
}

type Messages = MessageItem[]

export const CreatorPage: React.FC<CreatorPageProps> = ({}) => {
    const pageColumnStyle = {
        flex: 1,
        maxWidth: "33%",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "0.5vw",
        overflowY: "scroll",
        padding: "0 0.5vw 1vw",
    }

    const cardsColumnStyle = {
        flex: 1,
        flexDirection: "column",
        paddingTop: "0.5vw",
        paddingBottom: "0.1vw",
        gap: "0.5vw",
    }

    const location = useLocation()
    const userId = location.state?.userId as string | undefined
    const [user, setUser] = useState(location.state?.user as User | undefined)
    const [search] = useSearchParams()
    const id = (user ? user?.id : userId) || search.get("id")
    const [creator, setCreator] = useState(user?.creator)

    const [loading, setLoading] = useState(true)
    const [loadingLeft, setLoadingLeft] = useState(true)
    const [loadingCenter, setLoadingCenter] = useState(true)
    const [loadingRight, setLoadingRight] = useState(true)

    const [statistic, setStatistic] = useState<{ views: number; downloads: number; likes: number; messages: number }>()
    const [userTypes, setUserTypes] = useState<Role[]>([])
    const [messages, setMessages] = useState<Messages>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [currentTab, setCurrentTab] = useState(1)

    const [selectedRole, setSelectedRole] = useState<Role>()

    const [creatorFlag, setCreatorFlag] = useState(!!user?.creator?.active)
    const [adminFlag, setAdminFlag] = useState(!!user?.admin)

    const onSubmit = async (value: Role) => {
        if (loading) return
        setLoading(true)

        try {
            // console.log(value)
            const response = await api.patch("/user", { role: value, id: user?.id })
            // console.log(response.data)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    }

    const onSwitchCreator = async (e: boolean) => {
        const data = { user_id: user?.id, creator_flag: e }
        if (loading) return
        setLoading(true)

        try {
            const response = await api.post("/user/creator", data)
            setUser(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }
    const onSwitchAdmin = async (e: boolean) => {
        const data: PartialUser = { id: user!.id, admin: e }
        if (loading) return
        setLoading(true)

        try {
            const response = await api.patch("/user/", data)
            setUser(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    const fetchUser = async () => {
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
        try {
            const response = await api.get("/user/types")
            setUserTypes(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchStatistic = async () => {
        setLoadingLeft(true)
        try {
            const response = await api.get("/creator/statistics", { params: { creator_id: creator?.id } })
            setStatistic(response.data)
            setLoadingLeft(false)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoadingLeft(false)
            }, 3000)
        }
    }

    const fetchMessages = async () => {
        setLoadingCenter(true)
        try {
            const response = await api.get("/user/messages", { params: { user_id: id } })
            setMessages(response.data)
            setLoadingCenter(false)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoadingCenter(false)
            }, 3000)
        }
    }

    const fetchCourses = async () => {
        setLoadingRight(true)
        try {
            const response = await api.get("/course/owner", { params: { owner_id: creator?.id } })
            setCourses(response.data)
            setLoadingRight(false)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoadingRight(false)
            }, 500)
        }
    }

    const fetchLessons = async () => {
        try {
            const response = await api.get("/creator/lessons", { params: { creator_id: creator?.id } })
            setLessons(response.data)
        } catch (error) {
            console.log(error)
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
            setCreatorFlag(!!user.creator?.active)
            setAdminFlag(!!user.admin)
        }
    }, [user])

    useEffect(() => {
        if (creator) {
            fetchStatistic()
            fetchCourses()
            fetchLessons()
        }
    }, [creator])

    if (!id)
        return (
            <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
                <HeaderInfo title={`Criador não encontrado`} refreshButton={false} backButton />
                <NoFeaturedContent
                    styles={{ flex: 1 }}
                    title="O link que você tentou acessar parece estar quebrado ou não existe."
                    text="Por favor, verifique se o endereço está correto ou entre em contato com o suporte técnico para mais ajuda."
                />
            </Box>
        )

    return user === undefined ? (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
            <HeaderInfo title={`Criador não encontrado`} refreshButton={false} backButton />
            <NoFeaturedContent
                styles={{ flex: 1 }}
                title="O link que você tentou acessar parece estar quebrado ou não existe."
                text="Por favor, verifique se o endereço está correto ou entre em contato com o suporte técnico para mais ajuda."
            />
        </Box>
    ) : (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "76vw", height: "71.6vh" }}>
            <HeaderInfo title={`Informações do criador de conteúdo`} refreshButton={false} backButton />
            <Box sx={{ gap: "0.5vw", height: 1, flex: 1 }}>
                <Box sx={pageColumnStyle}>
                    <ColumnTitle prop="Nome:" value={creator?.nickname} />
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Paper sx={{ borderRadius: "1vw" }}>
                            <Avatar src={creator?.cover || placeholders.landscape} sx={{ width: "100%", height: "13.27vw", borderRadius: "1vw" }}>
                                <Avatar src={placeholders.landscape} />
                            </Avatar>
                        </Paper>
                        <Box sx={{ alignItems: "center", justifyContent: "space-between", flex: 1, marginTop: "-1.5vw" }}>
                            <Paper sx={{ borderRadius: "4vw" }}>
                                <Avatar src={user.creator?.image || placeholders.avatar} sx={{ width: "6vw", height: "6vw" }}>
                                    <Avatar src={placeholders.avatar} />
                                </Avatar>
                            </Paper>
                            <Box
                                sx={{
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <Box sx={{ alignItems: "center", alignSelf: "end" }}>
                                    <Typography variant="body1" component="p" sx={{}}>
                                        Administrador
                                    </Typography>
                                    <Switch checked={adminFlag} onChange={(_e, checked) => onSwitchAdmin(checked)} />
                                </Box>
                                <Box sx={{ alignItems: "center", alignSelf: "end", marginTop: "-0.5vw" }}>
                                    <Typography variant="body1" component="p">
                                        Criador de conteúdo
                                    </Typography>
                                    <Switch checked={creatorFlag} onChange={(_e, checked) => onSwitchCreator(checked)} />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ marginTop: "-1.5vw", marginLeft: "auto", gap: "0.5vw", alignItems: "center" }}>
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
                                        {loading ? <CircularProgress size={20} color="secondary" /> : "Salvar"}
                                    </Button>
                                </>
                            )}
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    maxWidth: "23.6vw",
                                    flex: 1,
                                    height: "fit-content",
                                    // maxHeight: "10.8vw",
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
                    {loadingLeft ? (
                        <Skeleton sx={{ flex: 1, transform: "scale(1)" }} />
                    ) : (
                        <Paper
                            sx={{
                                flexDirection: "column",
                                gap: "1vw",
                                height: "fit-content",
                                marginTop: "auto",
                                paddingBottom: "1vw",
                            }}
                        >
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
                    )}
                </Box>
                <Box sx={pageColumnStyle}>
                    <ColumnTitle prop="Ultímos Comentários" />
                    {loadingCenter ? (
                        <Skeleton sx={{ flex: 1, transform: "scale(1)" }} />
                    ) : (
                        <Box sx={{ ...cardsColumnStyle, marginTop: "0.5vw" }}>
                            {messages.map((item) => (
                                <MessageCard key={item.message.id} message={item.message} course={item.course} sx={{ width: "24.4vw" }} />
                            ))}
                        </Box>
                    )}
                </Box>
                {loadingRight ? (
                    <Skeleton sx={{ flex: 1, transform: "scale(1)" }} />
                ) : (
                    <Box sx={pageColumnStyle}>
                        <Tabs value={currentTab} onChange={(_, value) => setCurrentTab(value)} variant="fullWidth">
                            <Tab value={1} label="Cursos" />
                            <Tab value={2} label="Lições" />
                        </Tabs>
                        <Box
                            sx={{
                                ...cardsColumnStyle,
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
                                        link={`/cursos/${slugify(course.name)}?id=${course.id}`}
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
                                        link={`/licoes/${slugify(lesson.name)}?id=${lesson.id}`}
                                        routerParam={{ lesson }}
                                        sx={{ width: "24.4vw" }}
                                    />
                                ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
