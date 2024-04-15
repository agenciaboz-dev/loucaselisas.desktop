import { useContext } from "react"
import { UserContext } from "../contexts/userContext"
import { useNavigate } from "react-router-dom"
import { User } from "../types/server/class"

export const useUser = () => {
    const context = useContext(UserContext)
    const navigate = useNavigate()

    const onLogin = (user: User) => {
        context.setUser(user)
        navigate("/dashboard")
    }

    const onLogout = () => {
        context.setUser(null)
        navigate("/")
    }

    return { ...context, onLogin, onLogout }
}
