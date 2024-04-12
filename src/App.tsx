import React from 'react'
import { Providers } from './components/providers/Providers'
import { Routes } from './Routes'
import "./main.css"

interface AppProps {
    
}

export const App:React.FC<AppProps> = ({  }) => {
    
    return (
        <Providers>
            <Routes />       
        </Providers>
    )
}