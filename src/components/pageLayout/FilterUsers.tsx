import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { User } from "../../types/server/class"
import { FilterButton } from "./FilterButton"

interface FilterUsersProps {
    onFilter: (user: User[]) => void
    users: User[]
    active: string
    setActive: React.Dispatch<React.SetStateAction<string>>
}

export const FilterUsers: React.FC<FilterUsersProps> = ({ onFilter, users, active, setActive }) => {
    const onClickFilter = (id: string) => {
        setActive(id)
    }

    useEffect(() => {
        if (users.length && active) {
            let filteredUsers: User[] = []

            // if (active == "pending") {
            //     filteredUsers = users.filter((user) => user.role.name === "")
            // }

            // if (active == "aproved") {
            //     filteredUsers = users.filter((user) => user.role === "active")
            // }

            // if (active == "reproved") {
            //     filteredUsers = users.filter((user) => user.role === "declined")
            // }

            // if (active == "disabled") {
            //     filteredUsers = users.filter((user) => user.role === "declined")
            // }

            filteredUsers = filteredUsers.slice(0, 12)
            onFilter(filteredUsers)
        }
    }, [active])

    return (
        <Box sx={{ gap: "0.8vw", width: "74.7vw", overflowX: "scroll", height: "auto", scrollbarWidth: "none", flexShrink: 0, pr: "1vw" }}>
            <FilterButton active={"recent" === active} content="Novos Cursos" onClickFilter={() => onClickFilter("recent")} />
            <FilterButton active={"popular" === active} content="Mais Vistos" onClickFilter={() => onClickFilter("popular")} />
        </Box>
    )
}
