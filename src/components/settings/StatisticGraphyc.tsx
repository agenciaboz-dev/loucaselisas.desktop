import React from "react"
import { Box, useTheme } from "@mui/material"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

interface StatisticGraphycsProps {}

export const StatisticGraphycs: React.FC<StatisticGraphycsProps> = ({}) => {
    const data = [
        { name: "janeiro", indice1: 1000, indice2: 250 },
        { name: "fevereiro", indice1: 250, indice2: 750 },
        { name: "março", indice1: 750, indice2: 500 },
        { name: "abril", indice1: 250, indice2: 400 },
        { name: "maio", indice1: 500, indice2: 250 },
        // { name: "5", indice1: 500, indice2: 500 },
        // { name: "6", indice1: 750, indice2: 1000 },
        // { name: "7", indice1: 250, indice2: 1200 },
        // { name: "8", indice1: 700, indice2: 1000 },
        // { name: "9", indice1: 300, indice2: 275 },
    ]

    const theme = useTheme()

    return (
        <Box sx={{ width: "100%" }}>
            <AreaChart data={data} width={600} height={300}>
                <Area
                    type={"linear"}
                    dataKey={"indice1"}
                    strokeOpacity={0}
                    fillOpacity={0.4}
                    fill={theme.palette.primary.main}
                    dot={{ fill: theme.palette.primary.main, r: 5, opacity: 0.6 }}
                />
                <Area
                    type={"linear"}
                    dataKey={"indice2"}
                    strokeOpacity={0}
                    fillOpacity={0.4}
                    fill={theme.palette.primary.main}
                    dot={{ fill: theme.palette.primary.main, r: 5, opacity: 0.6 }}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </AreaChart>
        </Box>
    )
}
