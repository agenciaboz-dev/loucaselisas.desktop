import React, { useEffect, useRef, useState } from "react"
import { Box } from "@mui/material"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { FilterButton } from "./FilterButton"
import { useDraggable } from "react-use-draggable-scroll"

interface FilterLessonsProps {
    onFilter: (lesson: Lesson[]) => void
    lessons: Lesson[]
    active: string
    setActive: React.Dispatch<React.SetStateAction<string>>
}

export const FilterLessons: React.FC<FilterLessonsProps> = ({ onFilter, lessons, active, setActive }) => {
    const [loading, setLoading] = useState(false)
    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })

    const onClickFilter = (id: string) => {
        setActive(id)
    }

    useEffect(() => {
        if (loading) return

        setLoading(true)

        if (lessons.length && active) {
            let filteredLessons: Lesson[] = []

            if (active == "recent") {
                filteredLessons = lessons.sort((a, b) => Number(b.published) - Number(a.published))
            }

            if (active == "popular") {
                filteredLessons = lessons.sort((a, b) => b.views - a.views)
            }

            if (active == "favorites") {
                filteredLessons = lessons.sort((a, b) => b.likes - a.likes)
            }

            if (active == "mostDownloaded") {
                filteredLessons = lessons.sort((a, b) => b.downloads - a.downloads)
            }

            if (active == "pending") {
                filteredLessons = lessons.filter((course) => course.status === "pending")
            }

            if (active == "aproved") {
                filteredLessons = lessons.filter((course) => course.status === "active")
            }

            if (active == "reproved") {
                filteredLessons = lessons.filter((course) => course.status === "declined")
            }

            filteredLessons = filteredLessons.slice(0, 12)
            onFilter(filteredLessons)
        }

        setTimeout(() => {
            setLoading(false)
        }, 300)
    }, [active])

    return (
        <Box
            ref={ref}
            {...events}
            sx={{ gap: "0.8vw", width: "74.7vw", overflowX: "scroll", height: "auto", scrollbarWidth: "none", flexShrink: 0, pr: "1vw" }}
        >
            <FilterButton active={"recent" === active} content="Novas Lições" onClickFilter={() => onClickFilter("recent")} />
            <FilterButton active={"popular" === active} content="Mais Vistas" onClickFilter={() => onClickFilter("popular")} />
            <FilterButton active={"favorites" === active} content="Mais Curtidas" onClickFilter={() => onClickFilter("favorites")} />
            <FilterButton active={"mostDownloaded" === active} content="Mais Baixadas" onClickFilter={() => onClickFilter("mostDownloaded")} />
            <FilterButton active={"pending" === active} content="Em Análise" onClickFilter={() => onClickFilter("pending")} />
            <FilterButton active={"aproved" === active} content="Aprovadas" onClickFilter={() => onClickFilter("aproved")} />
            <FilterButton active={"reproved" === active} content="Recusadas" onClickFilter={() => onClickFilter("reproved")} />
        </Box>
    )
}
