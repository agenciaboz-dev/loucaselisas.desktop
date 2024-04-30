import React from "react"
import { Box, Button, SxProps } from "@mui/material"
import { IconType } from "react-icons/lib"

interface OutlineButtonProps {
    Icon: IconType
    title: string
    handleClick: () => void
    style?: SxProps
}

export const OutlineButton: React.FC<OutlineButtonProps> = ({ title, handleClick, Icon, style }) => {
    return (
        <Button
            variant="outlined"
            sx={{ border: "1px dashed", width: "fit-content", gap: "0.3vw", borderRadius: "0.7vw", ...style }}
            onClick={handleClick}
        >
            <Icon />
            {title}
        </Button>
    )
}
