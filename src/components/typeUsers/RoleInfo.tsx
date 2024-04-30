import React from "react"
import { Box, Divider, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { OutlineButton } from "./OutlineButtom"
import { FaEdit } from "react-icons/fa"

interface RoleInfoProps {}

export const RoleInfo: React.FC<RoleInfoProps> = ({}) => {
    return (
        <Paper sx={{ borderRadius: "1vw", width: 0.28, height: "100%", p: "1vw", flexDirection: "column", gap: "0.7vw" }}>
            <Box sx={{ width: 1, justifyContent: "space-between", alignItems: "center" }}>
                <Typography component={"h2"} fontSize={"1.3rem"}>
                    Role ID
                </Typography>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    Administrador
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ width: 1, justifyContent: "space-between", alignItems: "center" }}>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    Número de Membros
                </Typography>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    0
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ flexDirection: "column", textAlign: "justify", width: 1, gap: "0.5vw" }}>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    Descrição
                </Typography>
                <Typography component={"p"} fontSize={"1rem"}>
                    Facilisi etiam dignissim diam quis enim lobortis. Gravida arcu ac tortor dignissim convallis aenean et.
                    Bibendum enim facilisis gravida neque convallis. Malesuada fames ac turpis egestas integer.
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ flexDirection: "column", textAlign: "justify", width: 1, gap: "0.4vw" }}>
                <Typography component={"p"} fontSize={"1.1rem"}>
                    Menus Disponíveis
                </Typography>
                <Typography component={"p"} fontSize={"1rem"}>
                    Administrador
                </Typography>
                <TextField
                    select
                    InputProps={{
                        sx: { height: "2vw" }, // Define a altura do input
                    }}
                    SelectProps={{
                        MenuProps: {
                            sx: { maxHeight: "20vh" }, // Opcional: Limita a altura máxima do menu dropdown
                        },
                    }}
                >
                    <MenuItem value="option1">Opção 1</MenuItem>
                    <MenuItem value="option2">Opção 2</MenuItem>
                    <MenuItem value="option3">Opção 3</MenuItem>
                </TextField>
                <Typography component={"p"} fontSize={"1rem"}>
                    Estudante
                </Typography>
                <TextField
                    select
                    InputProps={{
                        sx: { height: "2vw" }, // Define a altura do input
                    }}
                    SelectProps={{
                        MenuProps: {
                            sx: { maxHeight: "20vh" }, // Opcional: Limita a altura máxima do menu dropdown
                        },
                    }}
                >
                    <MenuItem value="option1">Opção 1</MenuItem>
                    <MenuItem value="option2">Opção 2</MenuItem>
                    <MenuItem value="option3">Opção 3</MenuItem>
                </TextField>

                <Typography component={"p"} fontSize={"1rem"}>
                    Criador de conteúdo
                </Typography>
            </Box>
            <OutlineButton title="Editar" handleClick={() => {}} Icon={FaEdit} style={{ alignSelf: "end" }} />
        </Paper>
    )
}
