import React, { SetStateAction, useEffect, useRef } from "react"
import { Avatar, Paper } from "@mui/material"
import placeholders from "../../tools/placeholders"
import { useTimeInstant } from "../../hooks/useTimeInstant"
import { api } from "../../api/api"
import { useUser } from "../../hooks/useUser"
import { Lesson } from "../../types/server/class/Course/Lesson"

interface MediaProps {
    setShowCarrosel?: React.Dispatch<SetStateAction<boolean>> | undefined
    lesson?: Lesson
    media: {
        url: string | null
        type: "image" | "video"
    }
}

export const Media: React.FC<MediaProps> = ({ setShowCarrosel, media, lesson }) => {
    const video_ref = useRef<HTMLVideoElement>(null)
    const { user } = useUser()
    const { timeInstant, setTimeInstant } = useTimeInstant()

    // const saveWatchedTime = async (watched: number) => {
    //     try {
    //         const response = await api.post("/user/lesson_watchtime", { user_id: user?.id, lesson_id: lesson?.id, watched })
    //         console.log({ respostaSaveTime: response.data })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const fetchWatchedTime = async () => {
    //     try {
    //         const response = await api.get("/user/lesson_watchtime", { params: { user_id: user?.id, lesson_id: lesson?.id } })
    //         const data = response.data
    //         console.log({ fetchResponse: data })
    //         setTimeInstant(Number(data))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchWatchedTime()
    // }, [])

    useEffect(() => {
        if (video_ref.current && timeInstant !== undefined) {
            video_ref.current.currentTime = timeInstant
        }
    }, [timeInstant])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (video_ref.current) {
    //             saveWatchedTime(video_ref.current.currentTime)
    //         }
    //     }, 3000)

    //     return () => clearInterval(interval)
    // }, [video_ref.current?.currentTime, setTimeInstant])

    return (
        <>
            <Paper
                sx={{ borderRadius: "1vw", width: "42.5vw", height: "23.9vw" }}
                onMouseEnter={() => {
                    setShowCarrosel && setShowCarrosel(true)
                }}
                onMouseLeave={() => {
                    setShowCarrosel && setShowCarrosel(false)
                }}
            >
                {media.type === "video" && (
                    <video
                        ref={video_ref}
                        src={media.url || "/placeholders/video.webp"}
                        controls
                        style={{
                            borderRadius: "1vw",
                            width: "100%",
                            maxWidth: "100%",
                            maxHeight: "100%",
                        }}
                    />
                )}
                {media.type === "image" && (
                    <Avatar
                        variant="rounded"
                        src={media.url || placeholders.landscape}
                        sx={{ width: 1, height: 1, objectFit: "contain", borderRadius: "1vw" }}
                    />
                )}
            </Paper>
        </>
    )
}
