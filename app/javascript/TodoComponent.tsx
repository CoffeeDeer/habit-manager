import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, Link } from 'react-router-dom'
import { AppContainer } from './AppContainer'
import styled from 'styled-components'
import { Todo, TodoList } from './TodoList/Components'

const Nabvar = styled.nav`
    background: #dbfffe;
    min-height: 8vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Logo = styled.div`
    font-weight: bold;
    font-size: 23px;
    letter-spacing: 3px;
`

const NavItems = styled.ul`
    display: flex;
    width: 400px;
    max-width: 40%;
    justify-content: space-around;
    list-style: none;
`

const NavItem = styled.li`
    font-size: 19px;
    font-weight: bold;
    opacity: 0.7;
    &:hover {
        opacity: 1;
    }
`

const Wrapper = styled.div`
    width: 700px;
    max-width: 85%;
    margin: 20px auto;
`

//TODO: module
const mountNode = document.getElementById('resources-container')
const initialValues: Todo[] = JSON.parse(mountNode?.getAttribute('data') ?? '{}')

export const HomeIndex = () => {
    return (
        <AppContainer>
            <>
                <Nabvar>
                    <Logo>TODO</Logo>
                    <NavItems>
                        <NavItem>
                            <Link to="/todos">Todos</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/todos/new">Add New Todo</Link>
                        </NavItem>
                    </NavItems>
                </Nabvar>
                <Wrapper>
                    <Routes>
                        <Route path="/todos" element={<TodoList />} />
                    </Routes>
                </Wrapper>
            </>
        </AppContainer>
    )
}

createRoot(document.getElementById('root')!).render(<HomeIndex />)
