import React from "react"
import { Box, Card } from "@mui/material"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import backgroundVideo from "./assets/background.webm"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <Box>
            <video
                autoPlay
                loop
                muted
                style={{ pointerEvents: "none", zIndex: -1, position: "absolute", width: "100vw", height: "100vh", objectFit: "cover" }}
                src={backgroundVideo}
            ></video>

            <ReactRoutes>
                <Route path="/" element={<Home />} />
            </ReactRoutes>
        </Box>
    )
}
