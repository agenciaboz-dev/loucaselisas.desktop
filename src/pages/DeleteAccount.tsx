import React from "react"
import { Box, Paper, Typography } from "@mui/material"
import { HeaderInfo } from "../components/header/HeaderInfo"
import { StepByStep } from "../components/StepByStep"

interface DeleteAccountProps {}

export const DeleteAccount: React.FC<DeleteAccountProps> = ({}) => {
    const textoDestacado = {
        fontWeight: 700,
    }

    return (
        <Box sx={{ m: "4vw", flex: 1, height: "86vh", overflow: "hidden" }}>
            <Paper
                sx={{
                    width: 1,
                    backgroundColor: "background.default",
                }}
            >
                <Box sx={{ p: "0.5vw", flex: 1 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            flex: 1,
                            height: 1,
                            flexDirection: "column",
                            backgroundColor: "background.paper",
                            p: "1.5vw",
                            gap: "1vw",
                        }}
                    >
                        <HeaderInfo title="Deletar Conta" refreshButton={false} />
                        <Typography variant="h2" component="h2" sx={{ fontWeight: 700 }}>
                            Tutorial para Deletar sua Conta:
                        </Typography>
                        <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                            <StepByStep title="1. Acesse a tela principal do seu aplicativo:" text="Abra o aplicativo e vá para a tela inicial." />
                            <StepByStep
                                title="2. Clique em Configurações:"
                                text="No canto inferior direito da tela, você encontrará o ícone da engrenagem para acessar as configurações. Clique nele."
                            />
                            <StepByStep
                                title='3. Selecione "Deletar Conta":'
                                text='Dentro das configurações, procure a opção "Deletar Conta" e clique nela para continuar.'
                            />
                            <StepByStep
                                title="4. Confirme a exclusão:"
                                text='Após selecionar "Deletar Conta", uma tela de confirmação será exibida. Você verá a mensagem: "Tem certeza que deseja deletar sua conta? Esta ação é irreversível."'
                            />
                            <StepByStep
                                title="5. Decida sua ação:"
                                text='Se você realmente deseja excluir sua conta permanentemente, clique em "Sim". Se mudar de ideia, clique em "Voltar" para retornar às configurações sem excluir sua conta.'
                            />
                        </Box>
                    </Paper>
                </Box>
            </Paper>
        </Box>
    )
}
