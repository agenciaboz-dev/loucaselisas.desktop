import React from "react"
import { CircularProgress, IconButton } from "@mui/material"
import CachedIcon from "@mui/icons-material/Cached"

interface RefreshButtonProps {
    callBack: () => void
    carregando: boolean
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({ callBack, carregando }) => {
    return (
        <IconButton color="primary" onClick={callBack}>
            {carregando ? <CircularProgress size="1.5rem" /> : <CachedIcon />}
        </IconButton>
    )
}
