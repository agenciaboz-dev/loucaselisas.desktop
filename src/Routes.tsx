import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import backgroundVideo from "./assets/background.webm"
import { DashBoard } from "./pages/DashBoard"
import { PageLayout } from "./pages/PageLayout"
import { Courses } from "./pages/Courses"
import { Lessons } from "./pages/Lessons"
import { Aprove } from "./pages/Aprove"
import { Groups } from "./pages/Groups"
import { Users } from "./pages/Users"
import { Settings } from "./pages/Settings"

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
                <Route
                    path="/cursos"
                    element={<PageLayout children={<Courses />} title="Cursos" carregando={carregando} refreshCallback={refreshCallback} />}
                />
                <Route
                    path="/licoes"
                    element={<PageLayout children={<Lessons />} title="Lições" carregando={carregando} refreshCallback={refreshCallback} />}
                />
                <Route
                    path="/aprovar"
                    element={<PageLayout children={<Aprove />} title="Aprovar" carregando={carregando} refreshCallback={refreshCallback} />}
                />
                <Route
                    path="/grupos"
                    element={<PageLayout children={<Groups />} title="Grupos" carregando={carregando} refreshCallback={refreshCallback} />}
                />
                <Route
                    path="/usuarios"
                    element={<PageLayout children={<Users />} title="Usuários" carregando={carregando} refreshCallback={refreshCallback} />}
                />
                <Route
                    path="/configuracoes"
                    element={<PageLayout children={<Settings />} title="Configurações" carregando={carregando} refreshCallback={refreshCallback} />}
                />
            </ReactRoutes>
        </Box>
    )
}
