import React from "react"
import { Box, Button, SvgIconTypeMap, SxProps, useMediaQuery } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { IconType } from "react-icons/lib"

interface SocialMediaButonProps {
    link: string
    buttonSx?: SxProps
    iconSx?: SxProps
    buttonStyle?: React.CSSProperties | undefined
    iconStyle?: React.CSSProperties | undefined
    Icon?:
        | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
              muiName: string
          })
        | IconType
    ReactIcon?: IconType
}

export const SocialMediaButon: React.FC<SocialMediaButonProps> = ({ link, buttonSx, iconSx, Icon, iconStyle, buttonStyle, ReactIcon }) => {
    const isMobile = useMediaQuery("(orientation:portrait")

    return (
        <Button
            variant="contained"
            color="secondary"
            sx={{ p: isMobile ? "2vw" : "0.5vw", borderRadius: "30vw", minWidth: 0, ...buttonSx }}
            style={{ ...buttonStyle }}
            onClick={() => window.open(link, "_blank")}
        >
            {Icon ? (
                <Icon sx={{ fontSize: isMobile ? "1.5rem" : "1.2rem", ...iconSx }} />
            ) : (
                ReactIcon && <ReactIcon style={{ fontSize: "1.2rem", ...iconStyle }} />
            )}
        </Button>
    )
}
