import React from "react"
import { Box } from "@mui/material"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import backgroundVideo from "./assets/background.webm"
import { DashBoard } from "./pages/DashBoard"
import { PageLayout } from "./pages/PageLayout"
import { Courses } from "./pages/courses/Courses"
import { Lessons } from "./pages/Lessons"
import { Aprove } from "./pages/Aprove"
import { Groups } from "./pages/Groups"
import { Users } from "./pages/Users"
import { Settings } from "./pages/Settings"
import { DeleteAccount } from "./pages/DeleteAccount"
import { useUser } from "./hooks/useUser"
import { TypeUsers } from "./pages/TypeUsers"
import { ResetPassword } from "./pages/ResetPassword"
import { ConfirmAccount } from "./pages/ConfirmAccount"
import { CoursePage } from "./pages/courses/Course"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()
    return (
        <Box>
            <video
                autoPlay
                loop
                muted
                style={{
                    pointerEvents: "none",
                    zIndex: -1,
                    position: "absolute",
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                }}
                src={backgroundVideo}
            ></video>

            <ReactRoutes>
                {/* {!user ? (
                    <>

                    <Route path="*" element={<Home />} />
                    </>
                ) : ( */}
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<PageLayout children={<DashBoard />} />} />
                    <Route path="/cursos" element={<PageLayout children={<Courses />} />} />
                    <Route path="/cursos/:id" element={<PageLayout children={<CoursePage />} />} />

                    <Route path="/licoes" element={<PageLayout children={<Lessons />} />} />
                    <Route path="/grupos" element={<PageLayout children={<Groups />} />} />
                    <Route path="/usuarios" element={<PageLayout children={<Users />} />} />
                    <Route path="/tipos-usuarios" element={<PageLayout children={<TypeUsers />} />} />
                    <Route path="/configuracoes" element={<PageLayout children={<Settings />} />} />

                    <Route path="/delete-account" element={<DeleteAccount />} />
                    <Route path="/confirmacao-de-conta" element={<ConfirmAccount />} />
                    <Route path="redefinir-senha/:user_id/:timestamp" element={<ResetPassword />} />
                </>
                {/* )} */}
            </ReactRoutes>
        </Box>
    )
}
