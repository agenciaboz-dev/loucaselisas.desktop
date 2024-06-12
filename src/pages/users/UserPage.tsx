import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, CircularProgress, Grid, MenuItem, Paper, Switch, TextField, Typography } from "@mui/material"
import { useLocation, useSearchParams } from "react-router-dom"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import { User } from "../../types/server/class"
import placeholders from "../../tools/placeholders"
import { api } from "../../api/api"
import { Message } from "../../types/server/class/Chat/Message"
import { Course } from "../../types/server/class/Course"
import { Role } from "../../types/server/class/Role"
import { ColumnTitle } from "./ColumnTitle"
import { MessageCard } from "./MessageCard"
import { NoFeaturedContent } from "../../components/dashboard/NoFeaturedContent"
import { PartialUser } from "../../types/server/class/User"
interface UserPageProps {}

interface MessageItem {
    message: Message
    course: Course
}

type Messages = MessageItem[]

export const UserPage: React.FC<UserPageProps> = ({}) => {
    const userColumnStyle = {
        maxWidth: "33%",
        height: "70vh",
        flexDirection: "column",
        gap: "0.5vw",
        overflowY: "scroll",
        padding: "0 0.5vw 1vw",
    }

    const [search] = useSearchParams()
    const location = useLocation()
    const userId = location.state?.userId as string | undefined
    const [user, setUser] = useState(location.state?.user as User | undefined)
    const id = (user ? user?.id : userId) || search.get("id")

    const [loading, setLoading] = useState(false)

    const [userTypes, setUserTypes] = useState<Role[]>([])
    const [messages, setMessages] = useState<Messages>([])

    const [selectedRole, setSelectedRole] = useState<Role>()
    const [creatorFlag, setCreatorFlag] = useState(!!user?.creator?.active)
    const [adminFlag, setAdminFlag] = useState(!!user?.admin)

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
        try {
            const response = await api.get("/user/types")
            setUserTypes(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchMessages = async () => {
        try {
            const response = await api.get("/user/messages", { params: { user_id: id } })
            setMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const onDelete = (message: Message) => {
        setMessages((messages) => {
            let course: Course | undefined = undefined

            const list = messages.filter((item) => {
                if (item.message.id === message.id) {
                    course = item.course
                }

                return item.message.id !== message.id
            })

            return [...list, { course: course!, message }]
        })
        console.log("mensagem setada")
    }

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            fetchMessages()
            fetchUsersTypes()
            setSelectedRole(user.role)
            setCreatorFlag(!!user.creator?.active)
            setAdminFlag(!!user.admin)
        }
    }, [user])

    if (!id)
        return (
            <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
                <HeaderInfo title={`Usuário não encontrado`} refreshButton={false} backButton />
                <NoFeaturedContent
                    styles={{ height: "37vw" }}
                    title="O link que você tentou acessar parece estar quebrado ou não existe."
                    text="Por favor, verifique se o endereço está correto ou entre em contato com o suporte técnico para mais ajuda."
                />
            </Box>
        )

    return user === undefined ? (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
            <HeaderInfo title={`Usuário não encontrado`} refreshButton={false} backButton />
            <NoFeaturedContent
                styles={{ height: "37vw" }}
                title="O link que você tentou acessar parece estar quebrado ou não existe."
                text="Por favor, verifique se o endereço está correto ou entre em contato com o suporte técnico para mais ajuda."
            />
        </Box>
    ) : (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "76vw", height: "71.6vh" }}>
            <HeaderInfo title={`Informações do usuário`} refreshButton={false} backButton />
            <Box sx={{ gap: "0.5vw", height: 1, flex: 1 }}>
                <Box sx={userColumnStyle}>
                    <ColumnTitle prop="Nome:" value={user.username || user.name} />
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Paper sx={{ borderRadius: "1vw" }}>
                            <Avatar src={user.cover || placeholders.landscape} sx={{ width: "23.6vw", height: "13.27vw", borderRadius: "1vw" }}>
                                <Avatar src={placeholders.landscape} />
                            </Avatar>
                        </Paper>
                        <Box sx={{ alignItems: "center", justifyContent: "space-between", flex: 1, marginTop: "-1.5vw" }}>
                            <Paper sx={{ borderRadius: "4vw" }}>
                                <Avatar src={user.image || placeholders.avatar} sx={{ width: "6vw", height: "6vw" }}>
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
                                                {type.name.charAt(0).toUpperCase() + type.name.slice(1).toLowerCase()}
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
                                {user.bio || "Não há descrição a ser exibida"}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: "0.5vw",
                        overflowY: "auto",
                        overflowX: "hidden",
                        width: "66%",
                        padding: "0 0.5vw 1vw",
                    }}
                >
                    <ColumnTitle prop="Últimos comentários" sx={{ width: 1 }} />
                    <Grid container spacing={2}>
                        {messages.length > 0 ? (
                            messages
                                .sort((a, b) => Number(b.message.datetime) - Number(a.message.datetime))
                                .map((item) => (
                                    <Grid item xs={6} key={item.message.id}>
                                        <MessageCard message={item.message} course={item.course} onDelete={onDelete} sx={{ height: "100%" }} />
                                    </Grid>
                                ))
                        ) : (
                            <Grid item xs={12} sx={{ height: "69vh" }}>
                                <NoFeaturedContent title="Não há comentários a serem exibidos" text="" />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
