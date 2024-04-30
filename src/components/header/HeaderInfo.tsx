import React from "react"
import { Box, Button, IconButton, Typography } from "@mui/material"
import { RefreshButton } from "./RefreshButtton"
import { useNavigate } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
import { useUser } from "../../hooks/useUser"
import { OutlineButton } from "../typeUsers/OutlineButtom"
import { IoMdAddCircleOutline } from "react-icons/io"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
interface HeaderInfoProps {
    title: string
    loading?: boolean
    refreshCallback?: () => void
    refreshButton?: boolean
    dashButton?: boolean
    exitButton?: boolean
    backButton?: boolean
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
    title,
    loading,
    refreshCallback,
    refreshButton = true,
    dashButton = false,
    exitButton = true,
    backButton = false
}) => {
    const { onLogout } = useUser()
    const navigate = useNavigate()
    return (
        <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ alignItems: "center", gap: "0.7vw" }}>
                {backButton && <IconButton onClick={()=> navigate("/cursos")}><ArrowBackIosIcon /></IconButton>}
                <Typography variant="h1" component="h1" sx={{ textTransform: "uppercase" }}>
                    {title}
                </Typography>
                {refreshButton && <RefreshButton loading={loading} callBack={refreshCallback} />}
                {dashButton && (
                    <Button variant="outlined" sx={{ border: "1px dashed", width: "fit-content", gap: "0.3vw", borderRadius: "1vw" }}>
                        Adicionar novo usuário
                        <IoMdAddCircleOutline size={"1.3vw"} />
                    </Button>
                )}
            </Box>

            {exitButton && (
                <Button endIcon={<LogoutIcon />} onClick={onLogout}>
                    <Typography variant="h4" component="p" sx={{ fontSize: "1.4rem" }}>
                        SAIR
                    </Typography>
                </Button>
            )}
        </Box>
    )
}
