import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { RefreshButton } from "../RefreshButtton"
import { useNavigate } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"

interface HeaderInfoProps {
    title: string
    loading: boolean
    refreshCallback: () => void
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({ title, loading, refreshCallback }) => {
    const navigate = useNavigate()
    return (
            <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ alignItems: "center", gap: "0.7vw", mb: 1 }}>
                    <Typography variant="h1" component="h1" sx={{ textTransform: "uppercase" }}>
                        {title}
                    </Typography>
                    <RefreshButton loading={loading} callBack={refreshCallback} />
                </Box>

                <Button endIcon={<LogoutIcon />} onClick={() => navigate("/")}>
                    <Typography variant="h4" component="p" sx={{ fontSize: "1.4rem" }}>
                        SAIR
                    </Typography>
                </Button>
            </Box>
    )
}
