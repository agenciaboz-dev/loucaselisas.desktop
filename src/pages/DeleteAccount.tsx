import React from "react"
import { Box } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"

interface DeleteAccountProps {}

export const DeleteAccount: React.FC<DeleteAccountProps> = ({}) => {
    return (
        <Box sx={{ m: "4vw", flex: 1, height: "86vh", overflow: "hidden" }}>
            <Box
                sx={{
                    width: 1,
                    backgroundColor: "background.default",
                }}
            >
                <HeaderInfo title="Deletar Conta" />
            </Box>
        </Box>
    )
}
