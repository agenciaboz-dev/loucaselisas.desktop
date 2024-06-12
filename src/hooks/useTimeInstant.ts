import { useContext } from "react"
import { TimeInstantContext } from "../contexts/TimeInstantContext"

export const useTimeInstant = () => {
    const context = useContext(TimeInstantContext)

    return { ...context }
}
