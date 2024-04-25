import React from "react"
import { Avatar, Box, Grid, IconButton, MenuItem, Paper, Typography } from "@mui/material"
import { User } from "../../types/server/class"
import { useNavigate } from "react-router-dom"
import MoreVertIcon from "@mui/icons-material/MoreVert"

interface UserCardProps {
    user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const navigate = useNavigate()

    return (
        <>
            <Grid item xs={1}>
                <Paper sx={{ p: "0.5vw", gap: "0.5vw" }}>
                    <MenuItem>
                        <Avatar src={user.image || undefined} />
                    </MenuItem>
                    <Box flexDirection="column">
                        <Box>
                            <Typography>{user.name}</Typography>
                            <Typography>{user.birth}</Typography>
                        </Box>
                        <Box>
                            <Typography>{user.role.name}</Typography>
                        </Box>
                    </Box>
                    <IconButton>
                        {" "}
                        <MoreVertIcon />
                    </IconButton>
                </Paper>
            </Grid>
        </>
    )
}
