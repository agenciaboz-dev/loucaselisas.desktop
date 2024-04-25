import React from "react"
import { Avatar, Box, Divider, Grid, Menu, MenuItem, Paper, Typography } from "@mui/material"
import MoreVert from "@mui/icons-material/MoreVert"
import { Course } from "../../types/server/class/Course"

interface GroupCardProps {
    course: Course
}

export const GroupCard: React.FC<GroupCardProps> = ({ course }) => {
    const max_text_width = "16vw"
    return (
        <Grid item xs={1} sx={{}}>
            <Paper sx={{ flexDirection: "column", p: "0.5vw", gap: "0.5vw", borderRadius: "1vw", flex: 1 }}>
                <Box sx={{ width: 1, flexDirection: "row", justifyContent: "space-between" }}>
                    <Box sx={{ flexDirection: "column", justifyContent: "space-between" }}>
                        <Typography
                            variant="body2"
                            component={"p"}
                            sx={{
                                maxWidth: max_text_width,
                                fontWeight: "bold",
                                textOverflow: "ellipsis",
                                overflowX: "hidden",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {course.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            component={"p"}
                            fontSize={"0.8rem"}
                            sx={{
                                maxWidth: max_text_width,
                                textOverflow: "ellipsis",
                                overflowX: "hidden",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {course.description}
                        </Typography>
                    </Box>
                    <Avatar src={course.cover} variant="rounded" sx={{ marginRight: "1vw", width: "2vw", height: "2vw" }} />
                </Box>
                <Divider />
                <Box
                    sx={{
                        width: 1,
                        flexDirection: "row",
                        gap: "0.5vw",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Avatar variant="circular" sx={{ width: "3vw", height: "3vw" }} />
                    <Box sx={{ width: 0.75, flexDirection: "column", gap: "0.2vw" }}>
                        <Typography variant="body2" component={"p"}>
                            [Usuário]
                        </Typography>
                        <Typography
                            variant="body2"
                            component={"p"}
                            fontSize={"0.8rem"}
                            sx={{
                                width: 1,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                textAlign: "justify",
                            }}
                        >
                            Facilisi etiam dignissim diam quis enim lobortis. Gravida arcu ac tortor dignissim convallis
                            aenean et. Bibendum enim facilisis gravida neque convallis. Malesuada fames ac turpis egestas
                            integer.
                        </Typography>
                        <Typography
                            variant="body2"
                            component={"p"}
                            fontSize={"0.7rem"}
                            sx={{ alignSelf: "end", color: "gray" }}
                        >
                            09/04/2024
                        </Typography>
                    </Box>
                    <MoreVert />
                </Box>
            </Paper>
        </Grid>
    )
}
