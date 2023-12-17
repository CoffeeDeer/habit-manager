import React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, Link } from 'react-router-dom'
import { AppContainer } from './AppContainer'
import styled from 'styled-components'
import { EditTodo, TodoList, NewTodo } from './TodoList'

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
                        <Route path="about" element={<TodoList />} />
                        <Route path="todos">
                            <Route index element={<TodoList />} />
                            <Route path="new" element={<NewTodo />} />
                            <Route path=":id/edit" element={<EditTodo />} />
                        </Route>
                    </Routes>
                </Wrapper>
            </>
        </AppContainer>
    )
}

createRoot(document.getElementById('root')!).render(<HomeIndex />)
