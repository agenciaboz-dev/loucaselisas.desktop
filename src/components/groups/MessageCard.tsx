import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, Dialog, Divider, IconButton, Paper, Skeleton } from "@mui/material"
import { Message } from "../../types/server/class/Chat/Message"
import { Creator } from "../../types/server/class"
import { useUser } from "../../hooks/useUser"
import logo_without from "../../assets/logo_without_text.svg"
import CloseIcon from "@mui/icons-material/Close"
import { MessageText } from "./MessageText"
import { MessageVideo } from "./MessageVideo"
import { MessageImage } from "./MessageImage"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { api } from "../../api/api"
import { DeleteMessage } from "./DeleteMessage"

interface MessageCardProps {
    message: Message
    list: Message[]
    creators: Partial<Creator>[]
    refreshing?: boolean
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, list, creators, refreshing }) => {
    const deleted = message.deleted
    const { user } = useUser()
    const you = message.user_id == user?.id
    // const skeletonWidth = message.text.length * 14 * 0.55 + 20

    const index = list.findIndex((item) => item.id == message.id)
    const previous_message = index > 0 ? list[index - 1] : null
    const next_message = index + 1 <= list.length ? list[index + 1] : null

    const same_message_above = !(!previous_message || previous_message.user_id != message.user_id)
    const same_message_bellow = !(!next_message || next_message.user_id != message.user_id)

    const [isOpen, setIsOpen] = useState(false)
    const [lesson, setLesson] = useState<Lesson>()
    const [onHover, setOnHover] = useState(false)

    const fetchLesson = async () => {
        try {
            const response = await api.get("/lesson", { params: { lesson_id: message.video_id } })
            setLesson(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (message.video_id) {
            fetchLesson()
        }
    }, [])

    return user ? (
        !refreshing ? (
            <Box
                sx={{
                    width: "70%",
                    height: "fit-content",
                    flexDirection: "column",
                    gap: "2vw",
                    alignSelf: you ? "flex-end" : "flex-start",
                    alignItems: you ? "flex-end" : "",
                    marginTop: same_message_above ? -1.3 : "",
                    ml: "0.6vw",
                    mr: "1vw",
                }}
            >
                {!same_message_above && (
                    <Box sx={{ flexDirection: "row", alignItems: "flex-end", marginBottom: "-1.5vw" }}>
                        {!!creators.find((item) => item.user_id == message.user_id) && <Avatar src={logo_without} sx={{ width: 20, height: 20 }} />}
                        <p style={{ paddingLeft: "0.4vw", paddingRight: "0.5vw" }}>{you ? "Você" : message.user?.name || "Usuário indisponível"}</p>
                    </Box>
                )}

                <Box
                    sx={{ alignItems: "center", width: you && onHover ? "39vw" : "fit-content", gap: "0.5vw" }}
                    onMouseEnter={() => setOnHover(true)}
                    onMouseLeave={() => setOnHover(false)}
                >
                    {!you && onHover && <DeleteMessage />}
                    <Paper
                        id={message.id}
                        elevation={1}
                        sx={{
                            width: "fit-content",
                            padding: message.media ? "0.3vw" : "0.6vw",
                            paddingBottom: message.text ? "0.6vw" : !message.text && message.media ? "0.3vw" : "0.5vw",
                            borderRadius: "1vw",
                            maxWidth: you && onHover ? "36vw" : "fit-content",
                            bgcolor: you ? "" : "",
                            borderBottomRightRadius: you && !same_message_bellow ? "0" : "1vw",
                            flexDirection: "column",
                            gap: "0.5vw",
                            marginLeft: you && onHover ? "auto" : "",
                        }}
                    >
                        {message.media && <MessageImage message={message} setIsOpen={setIsOpen} />}
                        {message.video_id && lesson && <MessageVideo message={message} lesson={lesson} />}
                        {message.video_id && <Divider />}
                        {message.text && <MessageText deleted={deleted} message={message} />}
                    </Paper>
                    {you && onHover && <DeleteMessage />}
                </Box>
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    PaperProps={{ sx: { width: "100%", maxWidth: "fit-content", gap: "1vw", borderRadius: "1.2vw", position: "relative" } }}
                >
                    <IconButton
                        sx={{
                            position: "absolute",
                            right: "1vw",
                            top: "1vw",
                            zIndex: 2000,
                            backgroundColor: "#000",
                            ":hover": {
                                backgroundColor: "#000",
                            },
                        }}
                        onClick={() => setIsOpen(false)}
                    >
                        <CloseIcon color="secondary" />
                    </IconButton>
                    <Avatar
                        src={message.media?.url}
                        variant="rounded"
                        sx={{ width: "60vw", height: "33vw", borderRadius: "0.5vw" }}
                        onClick={() => setIsOpen(true)}
                    />
                </Dialog>
            </Box>
        ) : (
            <Box
                sx={{
                    width: "30%",
                    height: "fit-content",
                    flexDirection: "column",
                    gap: "2vw",
                    alignSelf: you ? "flex-end" : "flex-start",
                    alignItems: you ? "flex-end" : "",
                    marginTop: same_message_above ? -1.3 : "",
                    ml: "0.6vw",
                }}
            >
                {!same_message_above && (
                    <Box sx={{ flexDirection: "row", alignItems: "flex-end", marginBottom: "-1.5vw" }}>
                        {!!creators.find((item) => item.user_id == message.user_id) && <Avatar src={logo_without} sx={{ width: 20, height: 20 }} />}
                        <p style={{ paddingLeft: "0.4vw", paddingRight: "0.5vw" }}>{you ? "Você" : message.user?.name || "Usuário indisponível"}</p>
                    </Box>
                )}
                <Skeleton
                    sx={{
                        width: "fit-content",
                        padding: "1vw",
                        borderRadius: "0.8vw",
                        maxWidth: "fit-content",
                        bgcolor: you ? "" : "",
                        borderBottomRightRadius: you && !same_message_bellow ? "0" : "0.8vw",
                    }}
                >
                    <p>{message.text}</p>
                </Skeleton>
            </Box>
        )
    ) : null
}
