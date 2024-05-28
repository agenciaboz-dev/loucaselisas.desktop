import React from "react"
import { Fade, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"

interface OptionsMenuProps {
    paths: { link: string; title: string; icon: React.ReactNode }[]
}

export const OptionsMenu: React.FC<OptionsMenuProps> = ({ paths }) => {
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorElement)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorElement(null)
    }

    return (
        <>
            <IconButton id="fade-button" onClick={handleClick} color="secondary">
                <MoreVertIcon />
            </IconButton>
            <Menu id="fade-menu" anchorEl={anchorElement} open={open} onClose={handleClose} TransitionComponent={Fade}>
                {paths.map((path) => (
                    <MenuItem key={path.link} onClick={() => window.open(path.link, "_blank")} sx={{ justifyContent: "right" }}>
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
