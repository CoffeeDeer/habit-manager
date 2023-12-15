import { HelloReact } from './HelloReact'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from './AppContainer'

export const HomeIndex = () => {
    return (
        <AppContainer>
            <HelloReact />
        </AppContainer>
    )
}

// DOM Renderがここにいる必要があるのか
ReactDOM.render(<HomeIndex />, document.getElementById('root'))
