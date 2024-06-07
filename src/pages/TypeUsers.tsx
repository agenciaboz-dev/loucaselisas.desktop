import React, { useEffect, useState } from "react"
import { Box, Grid, Paper, Skeleton } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { SearchBar } from "../components/header/SearchBar"
import { TypeUserCard } from "../components/typeUsers/TypeUserCard"
import { RoleInfo } from "../components/typeUsers/RoleInfo"
import { api } from "../api/api"
import { Role } from "../types/server/class/Role"
import { TypeUserModal } from "../components/typeUsers/TypeUserModal"

interface TypeUsersProps {}

export const TypeUsers: React.FC<TypeUsersProps> = ({}) => {
    const skeletonCourse: string[] = new Array(6).fill(`course`)
    const [openModal, setopenModal] = useState(false)

    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRole, setSelectedRole] = useState<Role | null>(null)
    const fetchRoles = async () => {
        setLoading(true)
        try {
            const response = await api.get("/user/types")
            console.log({ roles: response.data })
            setRoles(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => setLoading(false), 500)
        }
    }

    useEffect(() => {
        fetchRoles()
    }, [])
    // useEffect(() => {
    //     if (roles.length !== 0) setSelectedRole(roles[0])
    // }, [roles])

    useEffect(() => {
        console.log(roles)
    }, [roles])

    return (
        <Box sx={{ width: "100%", flexDirection: "column" }}>
            <HeaderInfo
                title="Tipos de Usuários"
                // refreshButton={false}
                refreshCallback={() => fetchRoles()}
                loading={loading}
                dashButton
                handleClick={() => {
                    setopenModal(true)
                }}
            />
            <Box
                sx={{
                    flexDirection: "column",
                    height: "72.8vh",
                    width: 1,
                    gap: "0.8vw",
                    pt: "0.2vw",
                }}
            >
                <SearchBar handleSearch={() => {}} key={"name"} />

                <Box
                    // ref={ref}
                    // {...events}
                    sx={{
                        height: "66.9vh",
                        pt: "0.2vw",
                        overflowY: "hidden",
                        scrollbarWidth: "none",
                        gap: "0vw",
                        px: "1.5vw",
                        mx: "-1.5vw",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ width: 1, gap: "1vw", height: "95%", overflowY: "auto" }}>
                        <Box sx={{ width: 0.7, height: "fit-content", justifyContent: "center" }}>
                            <Grid container columns={3} spacing={2} sx={{ pb: "1vw", width: 1, pt: "1vw" }}>
                                {loading
                                    ? skeletonCourse.map((_, index) => (
                                          <Grid item xs={1} key={index}>
                                              <Paper
                                                  sx={{
                                                      flexDirection: "row",
                                                      p: "0.5vw",
                                                      borderRadius: "1vw",
                                                      flex: 1,
                                                      height: "4rem",
                                                      justifyContent: "space-between",
                                                  }}
                                              >
                                                  <Skeleton
                                                      animation="wave"
                                                      variant="rounded"
                                                      sx={{
                                                          width: "33%",
                                                          margin: "auto 0",
                                                      }}
                                                  />
                                                  <Skeleton
                                                      animation="wave"
                                                      variant="rounded"
                                                      sx={{
                                                          width: "1.5rem",
                                                          height: "1.5rem",
                                                          borderRadius: "50%",
                                                          margin: "auto 0.5rem",
                                                      }}
                                                  />
                                              </Paper>
                                          </Grid>
                                      ))
                                    : roles.map((role, index) => (
                                          <TypeUserCard key={index} role={role} setSelectedRole={setSelectedRole} />
                                      ))}
                            </Grid>
                        </Box>
                        {loading ? (
                            <Paper
                                sx={{
                                    borderRadius: "1vw",
                                    flexDirection: "column",
                                    flex: 1,
                                    height: "100%",
                                    padding: "1vw",
                                    gap: "1vw",
                                }}
                            >
                                <Box
                                    sx={{
                                        flexDirection: "column",
                                        gap: "2vw",
                                    }}
                                >
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        sx={{
                                            width: "100%",
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        sx={{
                                            width: "100%",
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        flexDirection: "column",
                                        gap: "1vw",
                                    }}
                                >
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        sx={{
                                            width: "100%",
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        sx={{
                                            width: "100%",
                                            height: "5vw",
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        flexDirection: "column",
                                        gap: "0.5vw",
                                    }}
                                >
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        sx={{
                                            width: "100%",
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        sx={{
                                            width: "100%",
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        sx={{
                                            width: "100%",
                                            height: "2vw",
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        sx={{
                                            width: "100%",
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        sx={{
                                            width: "100%",
                                            height: "2vw",
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        sx={{
                                            width: "100%",
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        sx={{
                                            width: "100%",
                                            height: "2vw",
                                        }}
                                    />
                                </Box>
                                <Skeleton
                                    variant="rounded"
                                    animation="wave"
                                    sx={{
                                        width: "20%",
                                        height: "2vw",
                                        marginLeft: "auto",
                                    }}
                                />
                            </Paper>
                        ) : (
                            <RoleInfo roles={roles} role={selectedRole} fetchRoles={fetchRoles} />
                        )}
                    </Box>
                    <TypeUserModal
                        openModal={openModal}
                        setOpenModal={setopenModal}
                        roles={roles}
                        role={selectedRole}
                        fetchRoles={fetchRoles}
                        edit={false}
                    />
                </Box>
            </Box>
        </Box>
    )
}
