import React from "react"
import { Box, Button, Dialog, TextField, Typography, Avatar as MuiAvatar } from "@mui/material"
import { Avatar, FileInputButton } from "@files-ui/react"
import { FormikErrors, FormikTouched } from "formik"
import { Category, CategoryForm } from "../../types/server/class/Category"
import placeholders from "../../tools/placeholders"

interface NewCategoryModalProps {
    formik: {
        values: CategoryForm
        errors: FormikErrors<CategoryForm>
        touched: FormikTouched<CategoryForm>
        handleChange: (e: React.ChangeEvent<any>) => void
        handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
    }
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    imageSource: File | undefined
    setImageSource: React.Dispatch<React.SetStateAction<File | undefined>>
    category?: Category
}

export const NewCategoryModal: React.FC<NewCategoryModalProps> = ({ openModal, setOpenModal, imageSource, setImageSource, formik, category }) => {
    return (
        <Dialog
            open={openModal}
            onClose={() => setOpenModal(!openModal)}
            PaperProps={{ sx: { width: "100%", maxWidth: "fit-content", padding: "1vw", gap: "1vw", borderRadius: "1.2vw" } }}
        >
            <form onSubmit={formik.handleSubmit}>
                <Box>
                    <Typography variant="body1" component="p" sx={{ fontSize: "1.5rem" }}>
                        {category ? "Editar Categoria" : "Adicionar Categoria"}
                    </Typography>
                </Box>
                <Box sx={{ gap: "1vw", width: "100%" }}>
                    <Avatar readOnly src={imageSource || category?.cover || placeholders.square} style={{ width: "135px", height: "135px" }} />
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                            <Typography>Nome da Categoria</Typography>
                            <TextField
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                sx={{ width: "20vw" }}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Box>
                        <Box sx={{ gap: "1vw", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography>Adicionar a imagem a categoria</Typography>
                            <FileInputButton
                                label="Procurar"
                                accept="image/*"
                                onChange={(files) => setImageSource(files[0].file)}
                                style={{ textTransform: "none", borderRadius: "5vw", backgroundColor: "#88827C" }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ gap: "1vw" }}>
                    <Button
                        variant="outlined"
                        sx={{ flex: 1, borderRadius: "5vw" }}
                        onClick={() => {
                            setOpenModal(!openModal)
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" sx={{ flex: 1, borderRadius: "5vw" }}>
                        {category ? "Salvar" : "Adicionar"}
                    </Button>
                </Box>
            </form>
        </Dialog>
    )
}
