// Entry point for the build script in your package.json
import React, { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

const root = document.getElementById('root')
if (!root) {
    throw new Error('No root element')
}

type props = {
    children: ReactNode
}

export const AppContainer = ({ children }: props) => {
    return (
        <React.StrictMode>
            <BrowserRouter>{children}</BrowserRouter>
        </React.StrictMode>
    )
}
