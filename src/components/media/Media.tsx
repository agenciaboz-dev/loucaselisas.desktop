import React, { SetStateAction } from "react"
import { Avatar, Paper } from "@mui/material"

interface MediaProps {
    setShowCarrosel: React.Dispatch<SetStateAction<boolean>>
    media: {
        url: string | null
        type: "image" | "video"
    }
}

export const Media: React.FC<MediaProps> = ({ setShowCarrosel, media }) => {
    return (
        <>
            <Paper
                sx={{ borderRadius: "1vw", width: "42.5vw", aspectRatio: "16/9" }}
                onMouseEnter={() => setShowCarrosel(true)}
                onMouseLeave={() => setShowCarrosel(false)}
            >
                {media.type === "video" && (
                    <video
                        src={media.url || "/placeholders/video.webp"}
                        controls
                        style={{
                            borderRadius: "1vw",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                )}
                {media.type === "image" && (
                    <Avatar
                        variant="rounded"
                        src={media.url || "/placeholders/midia_1-1.webp"}
                        sx={{ width: 1, height: 1, objectFit: "contain", borderRadius: "1vw" }}
                    />
                )}
            </Paper>
        </>
    )
}
