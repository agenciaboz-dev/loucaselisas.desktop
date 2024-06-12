import React, { createContext, useState } from "react"
import { User } from "../types/server/class"

interface UserContextValues {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

interface UserProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextValues>({} as UserContextValues)

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    return <UserContext.Provider value={{ setUser, user }}>{children}</UserContext.Provider>
}
