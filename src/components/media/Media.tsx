import React, { SetStateAction, useEffect, useRef } from "react"
import { Avatar, Paper } from "@mui/material"
import placeholders from "../../tools/placeholders"
import { useTimeInstant } from "../../hooks/useTimeInstant"

interface MediaProps {
    setShowCarrosel?: React.Dispatch<SetStateAction<boolean>> | undefined
    media: {
        url: string | null
        type: "image" | "video"
    }
}

export const Media: React.FC<MediaProps> = ({ setShowCarrosel, media }) => {
    const video_ref = useRef<HTMLVideoElement>(null)
    const { timeInstant } = useTimeInstant()

    useEffect(() => {
        if (video_ref.current && timeInstant) {
            video_ref.current.currentTime = timeInstant
        }
    }, [timeInstant])

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
