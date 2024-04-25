import React, { useEffect, useRef, useState } from "react"
import { Box, Grid } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { SearchBar } from "../components/header/SearchBar"
import { useDraggable } from "react-use-draggable-scroll"
import { api } from "../api/api"
import { User } from "../types/server/class"
import { UserCard } from "../components/users/UserCard"

interface UsersProps {}

export const Users: React.FC<UsersProps> = ({}) => {
    const [loading, setloading] = useState<boolean>(false)
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users)

    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })

    const getUsers = async () => {
        setloading(true)
        try {
            const response = await api.get("/user/all")
            setUsers(response.data)
            console.log({ users: response.data })
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => setloading(false), 500)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const handleSearch = (value: string) => {
        setFilteredUsers(users.filter((user) => user.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
    }

    useEffect(() => {
        setFilteredUsers(users)
    }, [users])

    return (
        <>
            <Box sx={{ width: 1, flexDirection: "column" }}>
                <HeaderInfo title="Usuários" loading={loading} refreshCallback={() => {}} />
                <Box
                    sx={{
                        flexDirection: "column",
                        width: 1,
                        gap: "0.8vw",
                        pt: "0.2vw",
                    }}
                >
                    <SearchBar handleSearch={(value) => handleSearch(value)} />
                    <Box
                        ref={ref}
                        {...events}
                        sx={{
                            height: "67vh",
                            pt: "0.2vw",
                            overflowY: "scroll",
                            scrollbarWidth: "none",
                            gap: "0.5vw",
                            px: "1.5vw",
                            mx: "-1.5vw",
                            flexDirection: "column",
                        }}
                    >
                        <Grid container columns={3} spacing={2} sx={{ pb: "1vw" }}>
                            {users.map((user) => (
                                <UserCard user={user} />
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
