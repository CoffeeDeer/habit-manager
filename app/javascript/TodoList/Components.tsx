import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useSWR, { mutate } from 'swr'

import styled from 'styled-components'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { AiFillEdit } from 'react-icons/ai'

const SearchAndButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SearchForm = styled.input`
    font-size: 20px;
    width: 100%;
    height: 40px;
    margin: 10px 0;
    padding: 10px;
`

const RemoveAllButton = styled.button`
    width: 16%;
    height: 40px;
    background: #f54242;
    border: none;
    font-weight: 500;
    margin-left: 10px;
    padding: 5px 10px;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
`

const TodoName = styled.span<{ $is_completed: boolean }>`
    font-size: 27px;
    opacity: ${(props) => (props.$is_completed ? '0.4' : '1.0')};
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 7px auto;
    padding: 10px;
    font-size: 25px;
`

const CheckedBox = styled.div<{ $is_completed: boolean }>`
    display: flex;
    align-items: center;
    margin: 0 7px;
    cursor: pointer;
    color: ${(props) => (props.$is_completed ? 'green' : 'black')};
`

const EditButton = styled.span`
    display: flex;
    align-items: center;
    margin: 0 7px;
`

export type Todo = {
    id: string
    name: string
    is_completed: boolean
}

export const TodoList = () => {
    const [todoList, setTodoList] = useState<Todo[]>([])
    const [searchName, setSearchName] = useState('')

    const { data, mutate } = useSWR<Todo[]>('/api/v1/todos', (url) => fetch(url).then((r) => r.json()))

    useEffect(() => {
        data ? setTodoList(data) : null
    }, [data])

    const removeAllTodos = () => {
        const sure = window.confirm('Are you sure?')
        if (sure) {
            /*
            axios
                .delete('/api/v1/todos/destroy_all')
                .then((resp) => {
                    setTodos([])
                })
                .catch((e) => {
                    console.log(e)
                })
            */
        }
    }

    const updateIsCompleted = (index, val: Todo) => {
        var data = {
            id: val.id,
            name: val.name,
            is_completed: !val.is_completed,
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }

        fetch(`/api/v1/todos/${val.id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                const updatedTodoList = todoList.map((todo) =>
                    todo.id === val.id ? { ...todo, is_completed: data.is_completed } : todo
                )
                mutate(updatedTodoList)
            })
            .catch(() => {
                alert('更新失敗')
            })
    }

    return (
        <>
            <h1>Todo List</h1>
            <SearchAndButton>
                <SearchForm
                    type="text"
                    placeholder="Search todo..."
                    onChange={(event) => {
                        setSearchName(event.target.value)
                    }}
                />
                <RemoveAllButton onClick={removeAllTodos}>Remove All</RemoveAllButton>
            </SearchAndButton>

            <div>
                {todoList
                    .filter((todo) => searchName === '' || todo.name.toLowerCase().includes(searchName.toLowerCase()))
                    .map((todo, key) => {
                        return (
                            <Row key={key}>
                                <CheckedBox $is_completed={todo.is_completed}>
                                    {todo.is_completed ? (
                                        <ImCheckboxChecked onClick={() => updateIsCompleted(key, todo)} />
                                    ) : (
                                        <ImCheckboxUnchecked onClick={() => updateIsCompleted(key, todo)} />
                                    )}
                                </CheckedBox>

                                <TodoName $is_completed={todo.is_completed}>{todo.name}</TodoName>
                                <Link to={'/todos/' + todo.id + '/edit'}>
                                    <EditButton>
                                        <AiFillEdit />
                                    </EditButton>
                                </Link>
                            </Row>
                        )
                    })}
            </div>
        </>
    )
}
