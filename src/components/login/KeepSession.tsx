import React, { useEffect } from "react"
import { useUser } from "../../hooks/useUser"
import { User } from "../../types/server/class"
import { api } from "../../api/api"

interface KeepSessionProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const KeepSession: React.FC<KeepSessionProps> = ({ setLoading }) => {
    const { onLogin } = useUser()

    const handleSession = async () => {
        const keepsession = JSON.parse(localStorage.getItem("stay_connected") || "false")
        if (keepsession) {
            const stored_session = localStorage.getItem("session")
            if (stored_session) {
                setLoading(true)
                const session = JSON.parse(stored_session) as User

                try {
                    const response = await api.post("login/keep_session", session)
                    const user = response.data

                    if (user) {
                        onLogin(user)
                    } else {
                        console.log("Não foi possível recuperar a sessão. Faça o login novamente")
                    }
                } catch (error) {
                    console.log(error)
                    console.log("Não foi possível recuperar a sessão. Faça o login novamente")
                } finally {
                    setLoading(false)
                }
            }
        }
    }

    useEffect(() => {
        handleSession()
    }, [])
    return null
}
