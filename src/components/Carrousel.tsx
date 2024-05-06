import React from "react"
import { Avatar, Box } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"

interface CarrouselProps {
    gallery: { url: string; type: "image" | "video" }[]
    setMedia: React.Dispatch<React.SetStateAction<{ url: string; type: "image" | "video" }>>
    onMouseEnter: () => void
    onMouseLeave: () => void
    isVideo: boolean
}

const mediaDesign = { width: "8vw", height: "5vw", borderRadius: "1vw", cursor: "pointer" }

export const Carrousel: React.FC<CarrouselProps> = ({ gallery, setMedia, onMouseEnter, onMouseLeave, isVideo }) => {
    return (
        <Box
            sx={{
                gap: "1vw",
                position: "absolute",
                bottom: isVideo ? "2vw" : 0,
                left: 0,
                height: "8vw",
                width: "42.5vw",
                background: "linear-gradient(0deg, #000000 20%, rgba(34, 34, 34, 0.7) 100%)",
                alignItems: "center",
                pl: "1vw",
                borderRadius: isVideo ? 0 : "0 0 1vw 1vw",
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {gallery.map((media) => (
                <>
                    {media.type === "image" && (
                        <Avatar key={media.url} src={media.url} sx={mediaDesign} onClick={() => setMedia({ type: media.type, url: media.url })} />
                    )}
                    {media.type === "video" && (
                        <Box
                            sx={{ ...mediaDesign, position: "relative", alignItems: "center", justifyContent: "center" }}
                            onClick={() => setMedia({ type: media.type, url: media.url })}
                        >
                            <video key={media.url} src={media.url} style={mediaDesign}></video>
                            <PlayArrowIcon color="secondary" sx={{ position: "absolute", fontSize: "2.5rem" }} />
                        </Box>
                    )}
                </>
            ))}
        </Box>
    )
}
