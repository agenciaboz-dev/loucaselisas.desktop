import React from "react"
import { Fade, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { paths } from "../../paths"

interface MenuMobileDropProps {}

export const MenuMobileDrop: React.FC<MenuMobileDropProps> = ({}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <IconButton id="fade-button" onClick={handleClick} color="secondary">
                <MenuIcon />
            </IconButton>
            <Menu id="fade-menu" anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
                {paths.map((path) => (
                    <MenuItem key={path.link} onClick={() => window.open(path.link, "_blank")} sx={{ justifyContent: "right" }}>
                        <Typography variant="body2" component="p" sx={{ fontSize: "1.3rem" }}>
                            {path.title}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}
