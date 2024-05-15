import React from "react"
import { Box, Typography } from "@mui/material"

interface NoFeaturedContentProps {}

export const NoFeaturedContent: React.FC<NoFeaturedContentProps> = ({}) => {
    return (
        // {filteredCourses.length === 0 && (
        <Box
            sx={{
                margin: "0.1vw 0",
                height: "12.8vw",
                width: 1,
                borderRadius: "1.2vw",
                border: "0.25vw dotted black",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
                userSelect: "none",
                touchAction: "none",
            }}
        >
            <Typography variant="h1" component="p" sx={{ pointerEvents: "none" }}>
                Ainda não há cursos cadastrados nessa categoria
            </Typography>
        </Box>
        // )}
    )
}
