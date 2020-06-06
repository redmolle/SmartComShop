import api from './api'
import React from 'react'
export const ACTION_TYPES = {
    TOKEN: 'TOKEN',
    CLEAR: 'CLEAR',
}

export const Token = (userName, password, onFail) => dispatch => {
    const body = {
        login: userName,
        password: password,
    }
    console.log(body)
    api.User().token(body)
    .then(
        response => {
            console.log(response)
            dispatch({
                type: ACTION_TYPES.TOKEN,
                payload: response.data
            })
        }
    )
    .catch(err => onFail(err.response.data.errorText))
}

export const Clear = () => dispatch => {
    dispatch({
        type: ACTION_TYPES.CLEAR
    })
}