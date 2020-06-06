import api from './api'
import React from 'react'
export const ACTION_TYPES = {
    ADD: 'ADD',
    DELETE: 'DELETE',
    DELETE_ALL: 'DELETE_ALL',
    READ: 'READ',
}

export const Read = (customerId) => dispatch => {
    api.Cart().read(customerId)
    .then(
        response => {
            dispatch({
                type: ACTION_TYPES.READ,
                payload: response.data
            })
        }
    )
    .catch(err => console.log(err))
}

export const AddItem = (customerId, itemId, onSuccess) => dispatch => {
    api.Cart().addItem(customerId, itemId)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.ADD,
            payload: res.data
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}

export const DeleteItem = (customerId, itemId, onSuccess) => dispatch => {
    api.Cart().deleteItem(customerId, itemId)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: { id, ...data }
        })
        onSuccess()
    })    .catch(err => console.log(err))

}

export const Delete = (customerId, onSuccess) => dispatch => {
    api.Cart().delete(customerId)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.DELETE_ALL,
            payload: id
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}