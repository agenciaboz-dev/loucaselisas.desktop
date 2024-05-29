import React, { useCallback, useEffect, useRef, useState } from "react"
import { Box, Divider, IconButton, TextField } from "@mui/material"
import { MdArrowForwardIos } from "react-icons/md"
import { Course } from "../types/server/class/Course"
import { Message, MessageForm } from "../types/server/class/Chat/Message"
import { useUser } from "../hooks/useUser"
import { Chat as ChatClass } from "../types/server/class/Chat/Chat"
import { Socket, io } from "socket.io-client"
import { url } from "../api/backend"
import { MessageCard } from "../components/groups/MessageCard"
import { User } from "../types/server/class"

interface ChatProps {
    setExpanded: React.Dispatch<React.SetStateAction<Boolean>>
    course: Course | null
    user: User | null
}

const input_style = {
    "& .MuiInputLabel-root.Mui-focused ": {
        color: "black",
    },

    "& .MuiInputBase-root": {
        color: "#fff",
        backgroundColor: "#fff",
        borderRadius: "0.8vw",
    },

    "& .MuiInputLabel-root ": {
        color: "#fff",
    },

    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none",
        },
        "&:hover fieldset": {
            border: "1px solid #88827C",
        },
        color: "black",
        "&.Mui-focused fieldset": {
            borderRadius: "15px",
            border: "1px solid #88827C",
        },
        "& .MuiInputBase-input": {
            color: "black",
        },
    },
}

export const Chat: React.FC<ChatProps> = ({ setExpanded, course, user }) => {
    const chatCourse = course?.chat
    const [messages, setMessages] = useState<Message[]>([])
    const [refreshing, setRefreshing] = useState(true)

    const socket = useRef<Socket | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [text, setText] = useState("")
    const listMessages = messages.sort((a, b) => Number(a.datetime) - Number(b.datetime))

    const onSubmitText = () => {
        if (!chatCourse || !socket.current || !user || !text) return

        const data: MessageForm = {
            chat_id: chatCourse.id,
            user_id: user.id,
            text,
            video_id: null,
            video_timestamp: null,
        }

        socket.current?.emit("chat:message", data)
        setText("")
    }

    const addMessage = (message: Message) => {
        setMessages((messages) => [...messages, message])
    }

    const listenToEvents = () => {
        if (!socket.current) return

        socket.current.on("connect", () => {
            console.log("socketio conected")
        })
        socket.current.on("disconnect", () => {
            console.log("socketio disconnected")
        })

        socket.current.on("chat:join", (data: Message[]) => {
            console.log("joined chat!")
            setMessages(data)
            setTimeout(() => {
                setRefreshing(false)
            }, 2000)
        })

        socket.current.on("chat:message", (message: Message) => {
            addMessage(message)
        })

        socket.current.on("chat:message:success", (message: Message) => {
            addMessage(message)
        })
    }

    const unListenEvents = () => {
        if (!socket.current) return

        socket.current.off("chat:join")
        socket.current.off("chat:message")
        socket.current.off("chat:message:success")
    }

    const socketConnect = () => {
        socket.current = io(`ws${url}`)
        listenToEvents()
        console.log({ COURSE: course?.chat?.id, CHATE: chatCourse?.id })
        if (chatCourse) socket.current.emit("chat:join", course?.chat?.id)
    }

    useEffect(() => {
        console.log("BLABLABLABLABLABLA")
        if (course) {
            socketConnect()
        }
        // useCallback(() => {

        // if (chatCourse) socketConnect()
        return () => {
            unListenEvents()
            socket.current?.disconnect()
        }
        // }, [])
    }, [course, chatCourse])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            event.preventDefault()
            onSubmitText()
        }
    }
    useEffect(() => {
        containerRef.current?.scrollBy({ top: messages.length * 3954980, behavior: "smooth" })
    }, [messages])
    return (
        <Box sx={{ bgcolor: "#E8E8E8", borderRadius: "1vw", p: "0.5vw", flexDirection: "column", flex: 1, height: "95%" }}>
            <Box sx={{ alignItems: "center", gap: "1vw" }}>
                <IconButton
                    sx={{ bgcolor: "#fff", width: "1.75rem", height: "1.75rem" }}
                    // size="small"
                    onClick={() => {
                        setExpanded(false)
                    }}
                >
                    <MdArrowForwardIos size={"1vw"} color="black" />
                </IconButton>
                <p style={{ fontSize: "1.3rem" }}>Grupo: {course?.name}</p>
            </Box>

            <Box sx={{ width: 1, flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
                <Box sx={{ flexDirection: "column", margin: "auto 0" }}>
                    <Divider />
                    <Box
                        ref={containerRef}
                        sx={{
                            width: 1,
                            height: "52vh",
                            flexDirection: "column",
                            gap: "1vw",
                            overflowY: "auto",
                            p: "1vw",
                        }}
                    >
                        {course &&
                            messages
                                .sort((a, b) => Number(a.datetime) - Number(b.datetime))
                                .map((item) => (
                                    <MessageCard
                                        message={item}
                                        list={messages}
                                        creators={[course.owner, ...course.creators]}
                                        refreshing={refreshing}
                                    />
                                ))}
                    </Box>
                    <Divider />
                </Box>
                <TextField
                    placeholder="Envie uma mensagem"
                    sx={input_style}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <MdArrowForwardIos type="submit" size={"1vw"} color="black" onClick={onSubmitText} style={{ cursor: "pointer" }} />
                        ),
                    }}
                    fullWidth
                />
            </Box>
        </Box>
    )
}
