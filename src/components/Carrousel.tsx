import React from "react"
import { Avatar, Box } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"

interface CarrouselProps {
    gallery: { url: string; type: "image" | "video" }[]
    setMedia: React.Dispatch<React.SetStateAction<{ url: string; type: "image" | "video" }>>
}

const mediaDesign = { width: "8vw", height: "5vw", borderRadius: "1vw" }

export const Carrousel: React.FC<CarrouselProps> = ({ gallery, setMedia }) => {
    return (
        <Box
            sx={{
                gap: "1vw",
                position: "relative",
                height: "8vw",
                width: "42.45vw",
                backgroundColor: "#000",
                alignItems: "center",
                pl: "1vw",
            }}
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
