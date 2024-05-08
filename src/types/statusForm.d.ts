import { Status } from "./server/class/Course"
import { Plan } from "./server/class/Plan"

export interface StatusForm {
    id: string
    status: Status
    declined_reason?: string
    price?: number
    plan?: Plan
}
