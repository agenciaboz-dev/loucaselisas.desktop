import React, { useState } from "react"
import { Box, Grid, Paper, Skeleton } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { SearchBar } from "../components/header/SearchBar"
import { TypeUserCard } from "../components/typeUsers/TypeUserCard"

interface TypeUsersProps {}

export const TypeUsers: React.FC<TypeUsersProps> = ({}) => {
    const skeletonCourse: string[] = new Array(20).fill(`course`)
    const [skeletonLoading, setSkeletonLoading] = useState<boolean>(false)
    return (
        <Box sx={{ width: "100%", flexDirection: "column" }}>
            <HeaderInfo title="Tipos de Usuários" refreshCallback={() => {}} />
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
                        gap: "0.5vw",
                        px: "1.5vw",
                        mx: "-1.5vw",
                        flexDirection: "column",
                    }}
                >
                    <Grid container columns={3} spacing={2} sx={{ pb: "1vw" }}>
                        {skeletonLoading ? (
                            skeletonCourse.map((_, index) => (
                                <Grid item xs={1} key={index}>
                                    <Paper
                                        sx={{
                                            flexDirection: "column",
                                            p: "0.7vw",
                                            gap: "0.5vw",
                                            borderRadius: "1vw",
                                            flex: 1,
                                        }}
                                    >
                                        <Box sx={{ width: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                            <Box
                                                sx={{
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                    gap: "0.3vw",
                                                }}
                                            >
                                                <Skeleton
                                                    variant="rounded"
                                                    animation="wave"
                                                    sx={{ width: "13vw", height: "1.2vw", maxWidth: "16vw" }}
                                                />
                                                <Skeleton
                                                    variant="rounded"
                                                    animation="wave"
                                                    sx={{ width: "18vw", height: "0.8vw", maxWidth: "16vw" }}
                                                />
                                            </Box>
                                            <Skeleton
                                                variant="rounded"
                                                animation="wave"
                                                sx={{ width: "3vw", height: "3vw" }}
                                            />
                                        </Box>

                                        <Box
                                            sx={{
                                                width: 1,
                                                minHeight: "5vw",
                                                flexDirection: "row",
                                                gap: "0.5vw",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Skeleton variant="circular" sx={{ width: "3vw", height: "3vw" }} />
                                            <Box sx={{ width: 0.75, flexDirection: "column", gap: "0.4vw" }}>
                                                <Skeleton
                                                    variant="rounded"
                                                    animation="wave"
                                                    sx={{ width: "13vw", height: "1.2vw", maxWidth: "16vw" }}
                                                />
                                                <Skeleton
                                                    variant="rounded"
                                                    animation="wave"
                                                    sx={{ width: "16vw", height: "2vw", maxWidth: "16vw" }}
                                                />
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))
                        ) : (
                            <TypeUserCard />
                        )}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
