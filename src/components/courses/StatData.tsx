import React from "react"
import { Box, SvgIconTypeMap, Typography } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"

interface StatDataProps {
    stats: number | undefined
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string
    }
}

export const StatData: React.FC<StatDataProps> = ({ stats, Icon }) => {
    return (
        <Box sx={{ gap: "0.2vw", alignItems: "center" }}>
            <Icon sx={{ fontSize: "1rem" }}></Icon>
            <Typography variant="body1" component="p" sx={{ fontSize: "1rem" }}>
                {stats}
            </Typography>
        </Box>
    )
}
