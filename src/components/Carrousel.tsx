import React, { useRef } from "react"
import { Avatar, Box, MenuItem } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { useDraggable } from "react-use-draggable-scroll"

interface CarrouselProps {
    gallery: { url: string | null; type: "image" | "video" }[]
    setMedia: React.Dispatch<React.SetStateAction<{ url: string | null; type: "image" | "video" }>>
    onMouseEnter: () => void
    onMouseLeave: () => void
    isVideo: boolean
}

const mediaDesign = { width: "8vw", height: "5vw", borderRadius: "1vw", padding: 0 }

export const Carrousel: React.FC<CarrouselProps> = ({ gallery, setMedia, onMouseEnter, onMouseLeave, isVideo }) => {
    const scrollRef = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(scrollRef, { applyRubberBandEffect: true })

    return (
        <Box
            ref={scrollRef}
            {...events}
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
                overflowX: "auto",
                scrollbarWidth: "none",
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {gallery.map((media) => (
                <MenuItem onClick={() => setMedia({ type: media.type, url: media.url })} sx={{ ...mediaDesign, userSelect: "none" }}>
                    {media.type === "image" && (
                        <Avatar key={media.url} src={media.url || "/placeholders/midia_1.1.webp"} sx={{ ...mediaDesign, pointerEvents: "none" }} />
                    )}
                    {media.type === "video" && (
                        <Box sx={{ ...mediaDesign, position: "relative", alignItems: "center", justifyContent: "center" }}>
                            {media.url ? (
                                <video key={media.url} src={media.url} style={{ ...mediaDesign, pointerEvents: "none" }}></video>
                            ) : (
                                <Avatar
                                    key={media.url}
                                    src={media.url || "/placeholders/midia_1.1.webp"}
                                    sx={{ ...mediaDesign, pointerEvents: "none" }}
                                />
                            )}
                            <PlayArrowIcon color="secondary" sx={{ position: "absolute", fontSize: "2.5rem" }} />
                        </Box>
                    )}
                </MenuItem>
            ))}
        </Box>
    )
}
