import React, { useEffect, useRef, useState } from "react"
import { Box } from "@mui/material"
import { Course } from "../../types/server/class/Course"
import { Category } from "../../types/server/class/Category"
import { api } from "../../api/api"
import { FilterButton } from "./FilterButton"
import { useDraggable } from "react-use-draggable-scroll"

interface FilterCoursesProps {
    onFilter: (course: Course[]) => void
    courses: Course[]
    active: string
    setActive: React.Dispatch<React.SetStateAction<string>>
    optionalFilters?: boolean
}

export const FilterCourses: React.FC<FilterCoursesProps> = ({ onFilter, courses, active, setActive, optionalFilters = false }) => {
    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)

    const getCategories = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get("/category/list/admin")
            setCategories(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onClickFilter = (id: string) => {
        setActive(id)
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if (courses.length && active) {
            let filteredCourses: Course[] = []

            if (active == "recent") {
                filteredCourses = courses.sort((a, b) => Number(b.published) - Number(a.published))
            }

            if (active == "popular") {
                filteredCourses = courses.sort((a, b) => b.views - a.views)
            }

            if (active == "pending") {
                filteredCourses = courses.filter((course) => course.status === "pending")
            }

            if (active == "aproved") {
                filteredCourses = courses.filter((course) => course.status === "active")
            }

            if (active == "reproved") {
                filteredCourses = courses.filter((course) => course.status === "declined")
            }

            const selectedCategory = categories.find((category) => category.id === active)

            if (selectedCategory) {
                filteredCourses = courses
                    .filter((course) => course.categories.find((category) => category.id == selectedCategory.id))
                    .sort((a, b) => b.views - a.views)
            }

            // filteredCourses = filteredCourses.slice(0, 10)
            onFilter(filteredCourses)
        }
    }, [active])

    return (
        <Box
            ref={ref}
            {...events}
            sx={{
                gap: "0.8vw",
                overflowX: "scroll",
                height: "auto",
                scrollbarWidth: "none",
                flexShrink: 0,
                px: "1.5vw",
                mx: "-1.5vw",
            }}
        >
            <FilterButton active={"recent" === active} content="Novos Cursos" onClickFilter={() => onClickFilter("recent")} />
            <FilterButton active={"popular" === active} content="Mais Vistos" onClickFilter={() => onClickFilter("popular")} />
            {optionalFilters && (
                <>
                    <FilterButton active={"pending" === active} content="Pendente" onClickFilter={() => onClickFilter("pending")} />
                    <FilterButton active={"aproved" === active} content="Aprovados" onClickFilter={() => onClickFilter("aproved")} />
                    <FilterButton active={"reproved" === active} content="Recusados" onClickFilter={() => onClickFilter("reproved")} />
                </>
            )}
            {categories.map((category) => (
                <FilterButton
                    loading={loading}
                    key={category.id}
                    active={category.id == active}
                    content={category.name}
                    onClickFilter={() => onClickFilter(category.id)}
                />
            ))}
        </Box>
    )
}
