import React from 'react'
import {Box} from '@mui/material'
import { Routes as ReactRoutes, Route } from 'react-router-dom'
import { Home } from './pages/Home'

interface RoutesProps {
    
}

export const Routes:React.FC<RoutesProps> = ({  }) => {
    
    return (
        <Box>
            <ReactRoutes>
                <Route path='/' element={<Home/>} />
            </ReactRoutes>
        </Box>
    )
}