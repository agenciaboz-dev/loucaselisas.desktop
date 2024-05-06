import React from "react"
import { Box } from "@mui/material"
import { HeaderInfo } from "../../components/header/HeaderInfo"
import { useLocation } from "react-router-dom"
import { Lesson } from "../../types/server/class/Course/Lesson"

interface LessonPageProps {}

export const LessonPage: React.FC<LessonPageProps> = ({}) => {
    const lesson = useLocation().state.data as Lesson

    return (
        <Box sx={{ flexDirection: "column" }}>
            <HeaderInfo title={`Lição: ${lesson.name}`} backButton exitButton={false} refreshButton={false} chatButton menuButton />
        </Box>
    )
}
