import React, { useCallback, useEffect, useRef, useState } from "react"
import { Box, IconButton, TextField } from "@mui/material"
import { MdArrowForwardIos } from "react-icons/md"
import { Course } from "../types/server/class/Course"
import { Message, MessageForm } from "../types/server/class/Chat/Message"
import { useUser } from "../hooks/useUser"
import { Chat as ChatClass } from "../types/server/class/Chat/Chat"
import { Socket, io } from "socket.io-client"
import { url } from "../api/backend"
import { MessageCard } from "../components/groups/MessageCard"

interface ChatProps {
    setExpanded: React.Dispatch<React.SetStateAction<Boolean>>
    course: Course | null
    messages: Message[]
    refreshing?: boolean
}

const input_style = {
    position: "relative",
    top: "66vh",
    "& .MuiInputLabel-root.Mui-focused ": {
        color: "black", // Cor do label quando o TextField está em foco (digitando)
    },

    "& .MuiInputBase-root": {
        color: "#fff",
        backgroundColor: "#f0f4f7",
        borderRadius: "0.8vw",
    },

    "& .MuiInputLabel-root ": {
        color: "#fff",
    },

    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none", // Remove a borda quando o campo não está focado
        },
        color: "black", // Garante que o texto digitado seja preto
        "&.Mui-focused fieldset": {
            borderRadius: "15px", // Bordas arredondadas
            border: "none", // Sem borda
        },
        "& .MuiInputBase-input": {
            color: "black", // Garante que o texto digitado e o placeholder sejam preto
        },
    },
}

export const Chat: React.FC<ChatProps> = ({ setExpanded, course, messages, refreshing }) => {
    return (
        <Box sx={{ width: "66.5%", maxHeight: "98%", bgcolor: "#E5E5E5", borderRadius: "0.5vw", p: "1vw" }}>
            <Box sx={{ position: "absolute", left: "44.5vw", top: "7.5vw", alignItems: "center", gap: "1vw" }}>
                <IconButton
                    sx={{ bgcolor: "#fff" }}
                    size="medium"
                    onClick={() => {
                        setExpanded(false)
                    }}
                >
                    <MdArrowForwardIos size={"1vw"} color="black" />
                </IconButton>
                <p style={{ fontSize: "1.3rem" }}>Grupo - {course?.name}</p>
            </Box>

            <Box sx={{ width: 1, height: 1, flexDirection: "column" }}>
                <TextField
                    placeholder="Envie uma mensagem "
                    sx={input_style}
                    InputProps={{ endAdornment: <MdArrowForwardIos size={"1vw"} color="black" /> }}
                    fullWidth
                />
                <Box sx={{ flexDirection: "column-reverse" }}>
                    {course &&
                        messages.map((item) => (
                            <MessageCard
                                message={item}
                                list={messages}
                                creators={[course.owner, ...course.creators]}
                                refreshing={refreshing}
                            />
                        ))}
                </Box>
            </Box>
        </Box>
    )
}
