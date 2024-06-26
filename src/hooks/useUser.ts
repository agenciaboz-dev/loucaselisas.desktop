import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { User } from "../types/server/class"

export const useUser = () => {
    const context = useContext(UserContext)
    const navigate = useNavigate()

    const onLogin = (user: User, keepSession?: boolean) => {
        context.setUser(user)
        {
            !keepSession && navigate("/dashboard")
        }
    }

    const onLogout = () => {
        localStorage.setItem("session", JSON.stringify(null))
        localStorage.setItem("stay_connected", JSON.stringify(null))
        context.setUser(null)
        navigate("/")
    }

    return { ...context, onLogin, onLogout }
}
