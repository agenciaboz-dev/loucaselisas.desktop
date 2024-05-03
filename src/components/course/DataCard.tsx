import React from "react"
import { Avatar, Box, LinearProgress, Typography } from "@mui/material"

interface DataCardProps {
    image: string | null
    name: string
    description: string
    time?: number
}

export const DataCard: React.FC<DataCardProps> = ({ image, description, name, time }) => {
    return (
        <Box sx={{ flex: 1, gap: "1vw", maxHeight: "5vw" }}>
            <Avatar
                variant="rounded"
                src={image || "/placeholders/perfil.webp"}
                alt="Capa do curso"
                sx={{ width: "5vw", height: "5vw", objectFit: "cover" }}
            />
            <Box sx={{ justifyContent: "space-between", flexDirection: "column" }}>
                <Typography variant="subtitle1" component="h3" sx={{ fontSize: "1rem" }}>
                    {name}
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{
                        width: "23.7vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {description}
                </Typography>

                <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <LinearProgress variant="determinate" value={65} sx={{ width: "15vw" }} />
                    <Typography variant="body2" component="p" sx={{ fontSize: "0.8rem", alignSelf: "end" }}>
                        {time || "59:99"}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
