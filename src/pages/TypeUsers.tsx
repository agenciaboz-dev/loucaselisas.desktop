import React, { useEffect, useState } from "react"
import { Box, Grid, Paper, Skeleton } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { SearchBar } from "../components/header/SearchBar"
import { TypeUserCard } from "../components/typeUsers/TypeUserCard"
import { RoleInfo } from "../components/typeUsers/RoleInfo"
import { api } from "../api/api"
import { Role } from "../types/server/class/Role"

interface TypeUsersProps {}

export const TypeUsers: React.FC<TypeUsersProps> = ({}) => {
    const skeletonCourse: string[] = new Array(6).fill(`course`)
    const [roles, setRoles] = useState<Role[]>([])
    const [skeletonLoading, setSkeletonLoading] = useState<boolean>(false)
    const [selectedRole, setSelectedRole] = useState<Role | null>(null)
    const fetchRoles = async () => {
        try {
            const response = await api.get("/user/types")
            console.log({ roles: response.data })
            setRoles(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRoles()
    }, [])
    useEffect(() => {
        if (roles.length !== 0) setSelectedRole(roles[0])
    }, [roles])

    useEffect(() => {
        console.log(roles)
    }, [roles])

    return (
        <Box sx={{ width: "100%", flexDirection: "column" }}>
            <HeaderInfo title="Tipos de Usuários" refreshButton={false} refreshCallback={() => {}} dashButton />
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
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                        gap: "0vw",
                        px: "1.5vw",
                        mx: "-1.5vw",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ width: 1, gap: "1vw", height: "95%" }}>
                        <Box sx={{ width: 0.7, height: "fit-content", justifyContent: "center" }}>
                            <Grid container columns={2} spacing={2} sx={{ pb: "1vw", width: 1 }}>
                                {skeletonLoading
                                    ? skeletonCourse.map((_, index) => (
                                          <Grid item xs={1} key={index}>
                                              <Skeleton
                                                  animation="wave"
                                                  variant="rounded"
                                                  sx={{
                                                      flexDirection: "column",
                                                      p: "0.5vw",
                                                      gap: "0.5vw",
                                                      borderRadius: "1vw",
                                                      flex: 1,
                                                      height: "3vw",
                                                  }}
                                              />
                                          </Grid>
                                      ))
                                    : roles.map((role, index) => (
                                          <TypeUserCard key={index} role={role} setSelectedRole={setSelectedRole} />
                                      ))}
                            </Grid>
                        </Box>
                        {skeletonLoading ? (
                            <Skeleton
                                variant="rounded"
                                animation="wave"
                                sx={{ borderRadius: "1vw", width: 0.3, height: "100%" }}
                            />
                        ) : (
                            selectedRole && <RoleInfo roles={roles} role={selectedRole} />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
