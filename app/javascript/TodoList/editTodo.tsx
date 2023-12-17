import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Todo } from './types'

import styled from 'styled-components'
import { toast } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css'

import useSWR, { mutate } from 'swr'

const InputName = styled.input`
    font-size: 20px;
    width: 100%;
    height: 40px;
    padding: 2px 7px;
    margin: 12px 0;
`

const CurrentStatus = styled.span`
    font-size: 19px;
    margin: 8px 12px 12px 0;
    font-weight: bold;
`

const IsCompletedButton = styled.button`
    color: #fff;
    font-weight: 500;
    font-size: 17px;
    padding: 5px 10px;
    background: #f2a115;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`

const SaveButton = styled.button`
    color: white;
    font-weight: 500;
    font-size: 17px;
    padding: 5px 10px;
    margin: 0 10px;
    background: #0ac620;
    border-radius: 3px;
    border: none;
    float: right;
`

const DeleteButton = styled.button`
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    padding: 5px 10px;
    background: #f54242;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`

const requestOptions = {
    method: undefined,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.head.querySelector('meta[name=csrf-token]')?.getAttribute('content') ?? '',
    },
    body: undefined,
}

export const EditTodo = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [currentTodo, setCurrentTodo] = useState<Todo>({
        id: id ?? '-1',
        name: '',
        is_completed: false,
    })

    const { data } = useSWR<Todo>(`/api/v1/todos/${id}`, (url) => fetch(url).then((r) => r.json()))

    useEffect(() => {
        if (data) {
            setCurrentTodo(data)
        }
    }, [data])

    const notify = () => {
        toast.success('Todo successfully updated!', {
            position: 'bottom-center',
            hideProgressBar: true,
        })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setCurrentTodo({ ...currentTodo, [name]: value })
    }

    const updateTodo = () => {
        // TODO: to function
        fetch(`/api/v1/todos/${id}`, { ...requestOptions, method: 'PUT', body: JSON.stringify(currentTodo) })
            .then((response) => response.json())
            .then((data) => {
                notify()
                navigate('/todos')
            })
            .catch(() => {
                alert('更新失敗')
            })
    }

    const deleteTodo = () => {
        const sure = window.confirm('Are you sure?')
        if (sure) {
            // TODO: to function
            fetch(`/api/v1/todos/${id}`, { ...requestOptions, method: 'DELETE' })
                .then((response) => {
                    navigate('/todos')
                })
                .catch(() => {
                    alert('更新失敗')
                })
        }
    }

    return (
        <>
            <h1>Editing Todo</h1>
            <div>
                <div>
                    <label htmlFor="name">Current Name</label>
                    <InputName
                        type="text"
                        id="name"
                        name="name"
                        value={currentTodo.name}
                        onChange={handleInputChange}
                    />
                    <div>
                        <span>CurrentStatus: </span>
                        <CurrentStatus>{currentTodo.is_completed ? 'Completed' : 'UnCompleted'}</CurrentStatus>

                        {currentTodo.is_completed ? (
                            <IsCompletedButton
                                className="badge badge-primary mr-2"
                                onClick={() =>
                                    setCurrentTodo((prev) => {
                                        return { ...prev, is_completed: !prev.is_completed }
                                    })
                                }
                            >
                                Change To UnCompleted
                            </IsCompletedButton>
                        ) : (
                            <IsCompletedButton
                                className="badge badge-primary mr-2"
                                onClick={() =>
                                    setCurrentTodo((prev) => {
                                        return { ...prev, is_completed: !prev.is_completed }
                                    })
                                }
                            >
                                Change To Completed
                            </IsCompletedButton>
                        )}
                    </div>
                </div>
                <div style={{ marginTop: '50px' }}>
                    <SaveButton type="submit" onClick={updateTodo}>
                        Save
                    </SaveButton>
                    <DeleteButton className="badge badge-danger mr-2" onClick={deleteTodo}>
                        Delete
                    </DeleteButton>
                </div>
            </div>
        </>
    )
}
