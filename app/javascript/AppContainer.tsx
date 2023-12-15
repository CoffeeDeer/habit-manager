// Entry point for the build script in your package.json
import React from 'react'
import ReactDOM from 'react-dom'

const root = document.getElementById('root')
if (!root) {
    throw new Error('No root element')
}

export const AppContainer = ({ children }: { children?: React.ReactNode }) => {
    return <React.StrictMode>{children}</React.StrictMode>
}
