import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { RefreshButton } from "./RefreshButtton"
import { useNavigate } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"

interface HeaderInfoProps {
    title: string
    loading?: boolean
    refreshCallback?: () => void
    refreshButton?: boolean
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({ title, loading, refreshCallback, refreshButton = true }) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ alignItems: "center", gap: "0.7vw" }}>
                <Typography variant="h1" component="h1" sx={{ textTransform: "uppercase" }}>
                    {title}
                </Typography>
                {refreshButton && <RefreshButton loading={loading} callBack={refreshCallback} />}
            </Box>

            <Button endIcon={<LogoutIcon />} onClick={() => navigate("/")}>
                <Typography variant="h4" component="p" sx={{ fontSize: "1.4rem" }}>
                    SAIR
                </Typography>
            </Button>
        </Box>
    )
}
