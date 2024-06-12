import React, { createContext, useState } from "react"
import { Box } from "@mui/material"

interface TimeInstantContextProps {
    timeInstant: number | undefined
    setTimeInstant: React.Dispatch<React.SetStateAction<number>>
}

interface TimeInstantProviderProps {
    children: React.ReactNode
}

export const TimeInstantContext = createContext<TimeInstantContextProps>({} as TimeInstantContextProps)

export const TimeInstantProvider: React.FC<TimeInstantProviderProps> = ({ children }) => {
    const [timeInstant, setTimeInstant] = useState<number | undefined>(undefined)
    return <TimeInstantContext.Provider value={{ timeInstant, setTimeInstant }}>{children}</TimeInstantContext.Provider>
}
