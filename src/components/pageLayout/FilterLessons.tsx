import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { Lesson } from "../../types/server/class/Course/Lesson"

interface FilterLessonsProps {
    onFilter: (lesson: Lesson[]) => void
    lessons: Lesson[]
    active: string
    setActive: React.Dispatch<React.SetStateAction<string>>
}

export const FilterLessons: React.FC<FilterLessonsProps> = ({ onFilter, lessons, active, setActive }) => {
    // const [loading, setLoading] = useState<string>(false)

    const onClickFilter = (id: string) => {
        setActive(id)
    }

    useEffect(() => {
        if (lessons.length && active) {
            let filteredLessons: Lesson[] = []

            // if (active == "active") {
            //     filteredLessons = lessons.sort((a, b) => (b. === true) - a.active)
            // }
        }
    }, [active])

    return <Box sx={{}}></Box>
}
