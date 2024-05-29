import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, CircularProgress, Grid, MenuItem, Paper, Switch, TextField, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import { User } from "../../types/server/class"
import placeholders from "../../tools/placeholders"
import { api } from "../../api/api"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Message } from "../../types/server/class/Chat/Message"
import { Course } from "../../types/server/class/Course"
import { Role } from "../../types/server/class/Role"
import { PartialUser } from "../../types/server/class/User"
import { ColumnTitle } from "./ColumnTitle"
import { MessageCard } from "./MessageCard"
import { NoFeaturedContent } from "../../components/dashboard/NoFeaturedContent"
interface UserPageProps {}

interface MessageItem {
    message: Message
    course: Course
}

type Messages = MessageItem[]

export const UserPage: React.FC<UserPageProps> = ({}) => {
    const location = useLocation()
    const userId = location.state.userId as string | undefined
    const [user, setUser] = useState(location.state.user as User | undefined)
    const id = user ? user?.id : userId

    const [loading, setLoading] = useState(false)

    const [userTypes, setUserTypes] = useState<Role[]>([])
    const [messages, setMessages] = useState<Messages>([])

    const [selectedRole, setSelectedRole] = useState<Role>()
    const [creatorFlag, setCreatorFlag] = useState(!!user?.creator?.active)

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

    const onSwitch = async (e: boolean) => {
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

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            fetchMessages()
            fetchUsersTypes()
            setSelectedRole(user.role)
            setCreatorFlag(!!user.creator?.active)
        }
    }, [user])

    return user ? (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "76vw", height: "71.6vh" }}>
            <HeaderInfo title={`Informações do usuário`} refreshButton={false} exitButton={false} backButton />
            <Box sx={{ gap: "1vw", height: 1 }}>
                <Box sx={{ height: 1, maxWidth: "23.6vw", flexDirection: "column", justifyContent: "space-between", gap: "0.5vw", flex: 1 }}>
                    <ColumnTitle prop="Nome:" value={user.username || user.name} />
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Paper sx={{ borderRadius: "1vw" }}>
                            <Avatar src={user.cover || placeholders.landscape} sx={{ width: "23.6vw", height: "13.27vw", borderRadius: "1vw" }}>
                                <Avatar src={placeholders.landscape} />
                            </Avatar>
                        </Paper>
                        <Box sx={{ alignItems: "center", justifyContent: "space-between", marginTop: "-2.5vw" }}>
                            <Avatar src={user.image || placeholders.avatar} sx={{ width: "6vw", height: "6vw" }}>
                                <Avatar src={placeholders.avatar} />
                            </Avatar>
                            <Box sx={{ alignItems: "center", justifyContent: "end" }}>
                                <Typography variant="body1" component="p">
                                    Tornar um usuário um criador de conteúdo
                                </Typography>
                                <Switch checked={creatorFlag} onChange={(e, checked) => onSwitch(checked)} />
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
                                {user.bio || "Não há descrição a ser exibida"}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flexDirection: "column", gap: "1vw", height: "6vw", marginTop: "auto" }}></Box>
                </Box>

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
                {/* )} */}
            </Box>
        </Box>
    ) : null
}
