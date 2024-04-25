import React from "react"
import { Drawer, MenuItem, Typography } from "@mui/material"
import { paths } from "../../paths"

interface MenuMobileProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuMobile: React.FC<MenuMobileProps> = ({ isOpen, setIsOpen }) => {
    return (
        <Drawer
            variant="persistent"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            anchor="right"
            ModalProps={{
                BackdropProps: { sx: { backdropFilter: "blur(150px)", background: "transparent" } },
            }}
            PaperProps={{ sx: { width: "60%", mx: "-5vw", pr: "5vw", pt: "25vw", alignItems: "end", gap: "1vw" } }}
            sx={{ zIndex: 10 }}
        >
            {paths.map((path) => (
                <MenuItem
                    onClick={() => window.open(path.link, "_blank")}
                    color="primary"
                    sx={{
                        minHeight: 0,
                        p: "2vw 5vw",
                        width: "100%",
                        justifyContent: "right",
                    }}
                >
                    <Typography variant="body2" component="p" sx={{ fontSize: "1.3rem" }}>
                        {path.title}
                    </Typography>
                </MenuItem>
            ))}
        </Drawer>
    )
}
