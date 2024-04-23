import React from "react"
import { CircularProgress, IconButton } from "@mui/material"
import CachedIcon from "@mui/icons-material/Cached"

interface RefreshButtonProps {
    callBack: () => void
    loading: boolean
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({ callBack, loading }) => {
    return (
        <IconButton color="primary" onClick={callBack}>
            {loading ? <CircularProgress size="1.7rem" /> : <CachedIcon />}
        </IconButton>
    )
}
