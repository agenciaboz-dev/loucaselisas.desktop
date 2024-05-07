import { Status } from "../types/server/class/Course"
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import ClearIcon from "@mui/icons-material/Clear"
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

export const formatStatus = (status: Status) => {
    const formats = {
        active: { Icon: TaskAltIcon, text: "Ativo" },
        pending: { Icon: ReportGmailerrorredIcon, text: "Pendente" },
        disabled: { Icon: ClearIcon, text: "Inativo" },
        declined: { Icon: HighlightOffIcon, text: "Recusado" },
    }

    return formats[status]
}
