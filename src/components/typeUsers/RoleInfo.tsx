import React from "react"
import { Box, Checkbox, Divider, FormControlLabel, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { OutlineButton } from "./OutlineButtom"
import { FaEdit } from "react-icons/fa"
import { SelectRoles } from "./SelectRoles"

interface RoleInfoProps {}

export const RoleInfo: React.FC<RoleInfoProps> = ({}) => {
    const [checked, setChecked] = React.useState([false, false, false, false, false])

    const handleChangeStudent = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = [...checked]
        newChecked[index] = event.target.checked
        setChecked(newChecked)
    }
    const children = (
        <Box sx={{ display: "flex", flexDirection: "column", ml: 6, pb: "1vw", borderRadius: "2vw" }}>
            <FormControlLabel
                label="Editar Perfil"
                control={<Checkbox checked={checked[1]} onChange={handleChangeStudent(1)} />}
            />
            <FormControlLabel
                label="Comentários"
                control={<Checkbox checked={checked[2]} onChange={handleChangeStudent(2)} />}
            />
            <FormControlLabel
                label="Estatísticas"
                control={<Checkbox checked={checked[3]} onChange={handleChangeStudent(3)} />}
            />
            <FormControlLabel
                label="Seus Cursos"
                control={<Checkbox checked={checked[4]} onChange={handleChangeStudent(4)} />}
            />
            <FormControlLabel
                label="Adicionar Novo Curso"
                control={<Checkbox checked={checked[5]} onChange={handleChangeStudent(5)} />}
            />
        </Box>
    )
    return (
        <Paper sx={{ borderRadius: "1vw", width: 0.28, height: "100%", p: "1vw", flexDirection: "column", gap: "0.5vw" }}>
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
                <SelectRoles />

                <Typography component={"p"} fontSize={"1rem"}>
                    Estudante
                </Typography>
                <SelectRoles />
                <Typography component={"p"} fontSize={"1rem"}>
                    Criador de conteúdo
                </Typography>
                <SelectRoles />
            </Box>
            <OutlineButton title="Editar" handleClick={() => {}} Icon={FaEdit} style={{ alignSelf: "end" }} />
        </Paper>
    )
}
