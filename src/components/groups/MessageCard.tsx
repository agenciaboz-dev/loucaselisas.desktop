import React, { useEffect } from "react"
import { Avatar, Box, Skeleton } from "@mui/material"
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

    useEffect(() => {
        console.log(message.text)
        console.log({ USER: user })
    }, [message])
    return user ? (
        !refreshing ? (
            <Box
                sx={{ alignSelf: "flex-start" }}

                // sx={[
                //     { alignSelf: "flex-start" },
                //     you && { alignSelf: "flex-end", alignItems: "flex-end" },
                //     same_message_above && { marginTop: -12 },
                // ]}
            >
                {!same_message_above && (
                    <Box sx={{ flexDirection: "row", alignItems: "flex-end", gap: 0, marginBottom: 5 }}>
                        {!!creators.find((item) => item.user_id == message.user_id) && (
                            <Avatar src={logo_without} sx={{ width: 20, height: 20 }} />
                        )}
                        <p style={{ paddingLeft: 5, paddingRight: 5 }}>
                            {you ? "Você" : message.user?.name || "Usuário indisponível"}
                        </p>
                    </Box>
                )}
                <Box
                    sx={{ padding: 10, borderRadius: 15, maxWidth: 300 }}
                    // sx={[
                    //     { padding: 10, borderRadius: 15, maxWidth: 300 },
                    //     you && { backgroundColor: "green" },
                    //     you && !same_message_bellow && { borderBottomRightRadius: 0 },

                    //     !you && !same_message_bellow && { borderBottomLeftRadius: 0, alignSelf: "flex-start" },
                    // ]}
                >
                    <p>{message.text}</p>
                </Box>
            </Box>
        ) : (
            <Skeleton />
            // <p>{message.text}</p>
        )
    ) : null
    // <p>{message.text}</p>
}
