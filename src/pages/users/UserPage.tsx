import React, { useState } from "react"
import { Box } from "@mui/material"
import { useLocation } from "react-router-dom"

interface UserPageProps {}

export const UserPage: React.FC<UserPageProps> = ({}) => {
    const location = useLocation()

    const [user, setuser] = useState(location.state.data)

    return <Box sx={{}}>{user.name}</Box>
}
