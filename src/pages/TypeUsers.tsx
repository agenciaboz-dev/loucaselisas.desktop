import React, { useEffect, useState } from "react"
import { Box, Grid, Paper, Skeleton } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { SearchBar } from "../components/header/SearchBar"
import { TypeUserCard } from "../components/typeUsers/TypeUserCard"
import { RoleInfo } from "../components/typeUsers/RoleInfo"
import { api } from "../api/api"
import { Role, RoleForm } from "../types/server/class/Role"
import { TypeUserModal } from "../components/typeUsers/TypeUserModal"
import { useSearchParams } from "react-router-dom"

interface TypeUsersProps {}

export const TypeUsers: React.FC<TypeUsersProps> = ({}) => {
    const skeletonCourse: string[] = new Array(6).fill(`course`)
    const [openModal, setopenModal] = useState(false)
    const [search] = useSearchParams()

    const [roles, setRoles] = useState<Role[]>([])
    const [filteredRoles, setFilteredRoles] = useState<Role[]>(roles)

    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRole, setSelectedRole] = useState<Role | null>(null)
    const fetchRoles = async () => {
        setLoading(true)
        try {
            const response = await api.get("/user/types")
            // console.log({ roles: response.data })
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

    useEffect(() => {
        // console.log(roles)
        setFilteredRoles(roles)
    }, [roles])

    const handleSearch = (value: string) => {
        const lowerCaseValue = value.toLowerCase()
        setFilteredRoles(
            roles.filter((role) => {
                const courseMatches = role.name.toLowerCase().includes(lowerCaseValue)

                return courseMatches
            })
        )
    }

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
                    overflow: "hidden",
                }}
            >
                <SearchBar handleSearch={(value) => handleSearch(value)} key={"name"} />

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
                    <Box sx={{ width: 1, gap: "1vw", height: "100%", overflowY: "auto", pt: "0.5vw", overflow: "hidden" }}>
                        <Box
                            sx={{
                                flex: 1,
                                height: "fit-content",
                                maxHeight: "100%",
                                justifyContent: "center",
                                overflowY: "auto",
                            }}
                        >
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
                                    : filteredRoles.map((role, index) => (
                                          <TypeUserCard key={index} role={role} setSelectedRole={setSelectedRole} fetchRoles={fetchRoles} />
                                      ))}
                            </Grid>
                        </Box>
                        {selectedRole && (
                            <Box sx={{ width: "25%" }}>
                                <RoleInfo roles={roles} role={selectedRole} fetchRoles={fetchRoles} setSelectedRole={setSelectedRole} />
                            </Box>
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
