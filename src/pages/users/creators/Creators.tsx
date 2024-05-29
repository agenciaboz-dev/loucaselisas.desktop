import React, { useEffect, useRef, useState } from "react"
import { Box, Grid, Paper, Skeleton } from "@mui/material"
import { HeaderInfo } from "../../../components/header/HeaderInfo"
import { SearchBar } from "../../../components/header/SearchBar"
import { useDraggable } from "react-use-draggable-scroll"
import { api } from "../../../api/api"
import { User } from "../../../types/server/class"
import { UserCard } from "../../../components/users/UserCard"
import { NoFeaturedContent } from "../../../components/dashboard/NoFeaturedContent"
import { slugify } from "../../../tools/urlMask"

interface CreatorsProps {}

export const Creators: React.FC<CreatorsProps> = ({}) => {
    const skeletonCreatorsCards: number[] = new Array(20).fill(0).map((_, index) => index)
    const [loading, setloading] = useState<boolean>(true)
    const [users, setUsers] = useState<User[]>([])
    const [creators, setCreators] = useState<User[]>([])

    console.log(creators)
    const [filteredCreators, setFilteredCreators] = useState<User[]>(creators)

    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })

    const getUsers = async () => {
        setloading(true)
        try {
            const response = await api.get("/user/all")
            setUsers(response.data)
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
        setFilteredCreators(creators.filter((user) => user.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
    }

    useEffect(() => {
        if (users) {
            setCreators(users.filter((user) => user.creator))
        }
    }, [users])

    useEffect(() => {
        setFilteredCreators(creators)
    }, [creators])

    return (
        <>
            <Box sx={{ width: 1, flexDirection: "column" }}>
                <HeaderInfo
                    title="Criadores de Conteúdo"
                    loading={loading}
                    refreshCallback={() => {
                        getUsers()
                    }}
                />
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
                            height: filteredCreators.length === 0 ? "65vh" : "67vh",
                            pt: "0.2vw",
                            overflowY: "scroll",
                            scrollbarWidth: "none",
                            gap: "0.5vw",
                            px: "1.5vw",
                            mx: "-1.5vw",
                            flexDirection: "column",
                        }}
                    >
                        {filteredCreators.length === 0 && !loading ? (
                            <>
                                <NoFeaturedContent />
                            </>
                        ) : (
                            <>
                                <Grid container columns={3} spacing={2} sx={{ pb: "1vw" }}>
                                    {loading
                                        ? skeletonCreatorsCards.map((_, index) => (
                                              <Grid key={index} item xs={1}>
                                                  <Paper sx={{ position: "relative" }}>
                                                      <Box sx={{ flex: 1, justifyContent: "space-between", p: "0.7vw" }}>
                                                          <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                                                              <Skeleton variant="circular" sx={{ width: "4.5vw", height: "4.5vw" }} />
                                                              <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                                                                  <Skeleton variant="rectangular" sx={{ width: "8vw" }} />
                                                                  <Skeleton variant="rectangular" sx={{ width: "15vw" }} />
                                                              </Box>
                                                          </Box>
                                                      </Box>
                                                  </Paper>
                                              </Grid>
                                          ))
                                        : filteredCreators.map((creators) => (
                                              <UserCard
                                                  creator
                                                  user={creators}
                                                  key={creators.id}
                                                  link={`/criadores/${slugify(creators.name)}`}
                                                  routerParam={creators}
                                              />
                                          ))}
                                </Grid>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}
