import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import backgroundVideo from "./assets/background.webm"
import { DashBoard } from "./pages/DashBoard"
import { PageLayout } from "./pages/PageLayout"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const [refreshCallback, setRefreshCallback] = useState<() => void>(() => () => null)
    const [carregando, setCarregando] = useState(false)

    useEffect(() => {
        console.log({ refreshCallback })
    }, [refreshCallback])

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
                <Route
                    path="/dashboard"
                    element={
                        <PageLayout
                            children={<DashBoard setRefreshCallback={setRefreshCallback} setCarregando={setCarregando} />}
                            title="DashBoard"
                            refreshCallback={refreshCallback}
                            carregando={carregando}
                        />
                    }
                />
            </ReactRoutes>
        </Box>
    )
}
