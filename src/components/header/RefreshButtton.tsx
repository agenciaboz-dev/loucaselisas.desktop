import React from "react"
import { CircularProgress, IconButton } from "@mui/material"
import CachedIcon from "@mui/icons-material/Cached"

interface RefreshButtonProps {
    callBack?: () => void
    loading?: boolean
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({ callBack, loading }) => {
    return (
        <IconButton color="primary" onClick={callBack} sx={{ maxHeight: "1.5rem" }}>
            {loading ? <CircularProgress size="1.5rem" /> : <CachedIcon sx={{ width: "1.5rem" }} />}
        </IconButton>
    )
}
