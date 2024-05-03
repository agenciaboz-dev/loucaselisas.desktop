import React, { SetStateAction } from "react"
import { Avatar, Box } from "@mui/material"

interface CarrouselProps {
    gallery: { url: string; type: string }[]
    setMedia: React.Dispatch<React.SetStateAction<{ url: string; type: "image" | "video" }>>
}

const mediaDesign = { width: "8vw", height: "5vw", borderRadius: "1vw" }

export const Carrousel: React.FC<CarrouselProps> = ({ gallery, setMedia }) => {
    return (
        <Box sx={{ gap: "1vw" }}>
            {gallery.map((media) => (
                <>
                    {media.type === "image" && (
                        <Avatar key={media.url} src={media.url} sx={mediaDesign} onClick={() => setMedia({ type: "image", url: media.url })} />
                    )}
                    {media.type === "video" && (
                        <video
                            key={media.url}
                            src={media.url}
                            style={mediaDesign}
                            onClick={() => setMedia({ type: "video", url: media.url })}
                        ></video>
                    )}
                </>
            ))}
        </Box>
    )
}
