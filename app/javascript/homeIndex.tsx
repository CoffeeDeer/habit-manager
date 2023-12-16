import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

import { AppContainer } from './AppContainer'

type Todo = {
    id: string
    name: string
    is_completed: boolean
}

//TODO: module
const mountNode = document.getElementById('resources-container')
const initialValues: Todo[] = JSON.parse(mountNode?.getAttribute('data') ?? '{}')

export const HomeIndex = ({ initialValues }: { initialValues: Todo[] }) => {
    const [todoList, setTodoList] = useState(initialValues)
    return (
        <AppContainer>
            {todoList.map((todo) => {
                return (
                    <div key={todo.id}>
                        <input
                            type="checkbox"
                            id={todo.id}
                            name={todo.name}
                            checked={todo.is_completed}
                            onChange={(event) => {
                                const targetId = todo.id
                                setTodoList((prev) =>
                                    prev.map((todo) =>
                                        todo.id === targetId
                                            ? {
                                                  ...todo,
                                                  is_completed: event.target.checked,
                                              }
                                            : todo
                                    )
                                )
                            }}
                        />
                        <label htmlFor={todo.id}>{todo.name}</label>
                    </div>
                )
            })}
        </AppContainer>
    )
}

createRoot(document.getElementById('root')!).render(<HomeIndex initialValues={initialValues} />)
