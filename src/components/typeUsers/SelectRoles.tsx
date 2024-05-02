import React from "react"
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material"

interface SelectRolesProps {}

export const SelectRoles: React.FC<SelectRolesProps> = ({}) => {
    const [checked, setChecked] = React.useState([false, false, false, false, false, false])

    const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = [...checked]
        newChecked[index] = event.target.checked
        setChecked(newChecked)
    }
    const children = (
        <Box sx={{ display: "flex", flexDirection: "column", ml: 8, pb: "1vw", borderRadius: "2vw" }}>
            <FormControlLabel label="Editar Perfil" control={<Checkbox checked={checked[1]} onChange={handleChange(1)} />} />
            <FormControlLabel label="Comentários" control={<Checkbox checked={checked[2]} onChange={handleChange(2)} />} />
            <FormControlLabel label="Estatísticas" control={<Checkbox checked={checked[3]} onChange={handleChange(3)} />} />
            <FormControlLabel label="Seus Cursos" control={<Checkbox checked={checked[4]} onChange={handleChange(4)} />} />
            <FormControlLabel
                label="Adicionar Novo Curso"
                control={<Checkbox checked={checked[5]} onChange={handleChange(5)} />}
            />
        </Box>
    )
    return (
        <TextField
            select
            InputProps={{
                sx: { height: "2vw" }, // Define a altura do input
            }}
            SelectProps={{
                MenuProps: {
                    sx: { maxHeight: "29vh" }, // Opcional: Limita a altura máxima do menu dropdown
                },
            }}
        >
            <Box
                sx={{
                    width: "20vw", // Defina a largura desejada
                    // padding: "0vw 1vw 0vw 1vw",
                    flexDirection: "column",
                    backgroundColor: "#E5E5E5", // Defina a cor de fundo desejada
                    display: "flex",
                }}
            >
                <FormControlLabel
                    label="Resumo"
                    control={
                        <Checkbox
                            checked={checked.slice(1).every(Boolean)}
                            indeterminate={checked.slice(1).some(Boolean) && !checked.slice(1).every(Boolean)}
                            onChange={(event) => {
                                const newChecked = event.target.checked
                                setChecked([newChecked, newChecked, newChecked, newChecked, newChecked, newChecked])
                            }}
                        />
                    }
                    sx={{ p: "0 2vw" }}
                />
                {children}
            </Box>
        </TextField>
    )
}
