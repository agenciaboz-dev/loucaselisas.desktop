import React, { useRef } from "react"
import { Avatar, Box, MenuItem } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { useDraggable } from "react-use-draggable-scroll"
import placeholders from "../tools/placeholders"

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
                background: "linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0.7) 40%, rgba(34, 34, 34, 0.7) 50%, rgba(34, 34, 34, 0) 100%)",
                alignItems: "center",
                px: "1vw",
                borderRadius: isVideo ? 0 : "0 0 1vw 1vw",
                overflowX: "auto",
                scrollbarWidth: "none",
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {gallery.map((media) => (
                <MenuItem key={media.url} onClick={() => setMedia({ type: media.type, url: media.url })} sx={{ ...mediaDesign, userSelect: "none" }}>
                    {media.type === "image" && <Avatar src={media.url || placeholders.landscape} sx={{ ...mediaDesign, pointerEvents: "none" }} />}
                    {media.type === "video" && (
                        <Box sx={{ ...mediaDesign, position: "relative", alignItems: "center", justifyContent: "center" }}>
                            {media.url ? (
                                <video src={media.url} style={{ ...mediaDesign, pointerEvents: "none" }}></video>
                            ) : (
                                <Avatar src={media.url || placeholders.landscape} sx={{ ...mediaDesign, pointerEvents: "none" }} />
                            )}
                            <PlayArrowIcon color="secondary" sx={{ position: "absolute", fontSize: "2.5rem" }} />
                        </Box>
                    )}
                </MenuItem>
            ))}
        </Box>
    )
}
