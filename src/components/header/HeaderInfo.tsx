import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { RefreshButton } from "./RefreshButtton"
import { useNavigate } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
import { useUser } from "../../hooks/useUser"
import { OutlineButton } from "../typeUsers/OutlineButtom"
import { IoMdAddCircleOutline } from "react-icons/io"
interface HeaderInfoProps {
    title: string
    loading?: boolean
    refreshCallback?: () => void
    refreshButton?: boolean
    dashButton?: boolean
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
    title,
    loading,
    refreshCallback,
    refreshButton = true,
    dashButton = false,
}) => {
    const navigate = useNavigate()
    const { user, onLogout } = useUser()
    return (
        <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ alignItems: "center", gap: "0.7vw" }}>
                <Typography variant="h1" component="h1" sx={{ textTransform: "uppercase" }}>
                    {title}
                </Typography>
                {refreshButton && <RefreshButton loading={loading} callBack={refreshCallback} />}
                {dashButton && (
                    <Button
                        variant="outlined"
                        sx={{ border: "1px dashed", width: "fit-content", gap: "0.3vw", borderRadius: "1vw" }}
                    >
                        Adicionar novo usuário
                        <IoMdAddCircleOutline size={"1.3vw"} />
                    </Button>
                )}
            </Box>

            <Button endIcon={<LogoutIcon />} onClick={onLogout}>
                <Typography variant="h4" component="p" sx={{ fontSize: "1.4rem" }}>
                    SAIR
                </Typography>
            </Button>
        </Box>
    )
}
