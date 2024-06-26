import React, { useEffect } from "react"
import { Fade, IconButton, Menu, MenuItem, SxProps, Typography } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Paths } from "../../types/paths"

interface OptionsMenuProps {
    paths: Paths | undefined
    sx?: SxProps
}

export const OptionsMenu: React.FC<OptionsMenuProps> = ({ paths, sx }) => {
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorElement)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorElement(null)
    }
    useEffect(() => {
        console.log(anchorElement)
    }, [anchorElement])

    return (
        <>
            <IconButton id="fade-button" onClick={handleClick} sx={sx}>
                <MoreVertIcon />
            </IconButton>
            <Menu id="fade-menu" anchorEl={anchorElement} open={open} onClose={handleClose} TransitionComponent={Fade}>
                {paths &&
                    paths.map((path) => (
                        <MenuItem
                            key={path.link}
                            onClick={() => {
                                path.onClick && path.onClick()
                                handleClose()
                            }}
                            sx={{ justifyContent: "right", gap: "0.5vw" }}
                        >
                            <Typography variant="body2" component="p" sx={{ fontSize: "1.3rem" }}>
                                {path.title}
                            </Typography>
                            {path.icon}
                        </MenuItem>
                    ))}
            </Menu>
        </>
    )
}
