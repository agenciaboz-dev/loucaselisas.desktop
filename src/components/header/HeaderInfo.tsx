import React from "react"
import { Box, Button, IconButton, Typography } from "@mui/material"
import { RefreshButton } from "./RefreshButtton"
import { useNavigate } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
import { useUser } from "../../hooks/useUser"
import { IoMdAddCircleOutline } from "react-icons/io"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ChatIcon from "@mui/icons-material/Chat"
import MoreVertIcon from "@mui/icons-material/MoreVert"
interface HeaderInfoProps {
    title: string
    loading?: boolean
    refreshCallback?: () => void
    refreshButton?: boolean
    dashButton?: boolean
    exitButton?: boolean
    backButton?: boolean
    chatButton?: boolean
    menuButton?: boolean
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
    title,
    loading,
    refreshCallback,
    refreshButton = true,
    dashButton = false,
    exitButton = true,
    backButton = false,
    chatButton = false,
    menuButton = false,
}) => {
    const { onLogout } = useUser()
    const navigate = useNavigate()
    return (
        <Box sx={{ alignItems: "center", justifyContent: "space-between", border: "1px solid red" }}>
            <Box sx={{ alignItems: "center", gap: "0.2vw", width: 1 }}>
                {backButton && (
                    <IconButton onClick={() => navigate("/cursos")}>
                        <ArrowBackIosIcon />
                    </IconButton>
                )}
                <Box sx={{ alignItems: "center", flex: 1, gap: "0.5vw" }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{ textTransform: "uppercase", maxWidth: "25vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                        {title}
                    </Typography>

                    {refreshButton && <RefreshButton loading={loading} callBack={refreshCallback} />}

                    {dashButton && (
                        <Button variant="outlined" sx={{ border: "1px dashed", width: "fit-content", gap: "0.3vw", borderRadius: "1vw" }}>
                            Adicionar novo usuário
                            <IoMdAddCircleOutline size={"1.3vw"} />
                        </Button>
                    )}

                    {!!chatButton && (
                        <Button variant="contained" endIcon={<ChatIcon />} sx={{ p: "0.2vw 1vw", borderRadius: "2vw", ml: "auto" }}>
                            Ir para grupo
                        </Button>
                    )}

                    {!!menuButton && (
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
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
        </Box>
    )
}
