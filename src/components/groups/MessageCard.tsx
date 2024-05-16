import React, { useEffect } from "react"
import { Avatar, Box, Paper, Skeleton } from "@mui/material"
import { Message } from "../../types/server/class/Chat/Message"
import { Creator } from "../../types/server/class"
import { useUser } from "../../hooks/useUser"
import logo_without from "../../assets/logo_without_text.svg"

interface MessageCardProps {
    message: Message
    list: Message[]
    creators: Partial<Creator>[]
    refreshing?: boolean
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, list, creators, refreshing }) => {
    const { user } = useUser()
    const you = message.user_id == user?.id
    const skeletonWidth = message.text.length * 14 * 0.55 + 20

    const index = list.findIndex((item) => item.id == message.id)
    const previous_message = index > 0 ? list[index - 1] : null
    const next_message = index + 1 <= list.length ? list[index + 1] : null

    const same_message_above = !(!previous_message || previous_message.user_id != message.user_id)
    const same_message_bellow = !(!next_message || next_message.user_id != message.user_id)

    // useEffect(() => {
    //     console.log(message.text)
    //     console.log({ USER: user })
    // }, [message])
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
                        {!!creators.find((item) => item.user_id == message.user_id) && (
                            <Avatar src={logo_without} sx={{ width: 20, height: 20 }} />
                        )}
                        <p style={{ paddingLeft: "0.4vw", paddingRight: "0.5vw" }}>
                            {you ? "Você" : message.user?.name || "Usuário indisponível"}
                        </p>
                    </Box>
                )}
                <Paper
                    elevation={1}
                    sx={{
                        width: "fit-content",
                        padding: "0.8vw",
                        borderRadius: "1vw",
                        maxWidth: "fit-content",
                        bgcolor: you ? "" : "",
                        borderBottomRightRadius: you && !same_message_bellow ? "0" : "1vw",
                    }}
                >
                    <p>{message.text}</p>
                </Paper>
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
                        {!!creators.find((item) => item.user_id == message.user_id) && (
                            <Avatar src={logo_without} sx={{ width: 20, height: 20 }} />
                        )}
                        <p style={{ paddingLeft: "0.4vw", paddingRight: "0.5vw" }}>
                            {you ? "Você" : message.user?.name || "Usuário indisponível"}
                        </p>
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
