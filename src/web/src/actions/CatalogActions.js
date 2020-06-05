import api from './api'
import React from 'react'
export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    FETCH_BY_ID: 'FETCH_BY_ID',
    FETCH_BY_PAGE: 'FETCH_BY_PAGE',
    ORDERED_FETCH: 'ORDERED_FETCH',
    ENHANCED_FETCH: 'ENHANCED_FETCH',
}



const formatData = data => ({
    ...data,
    price:Number(data.price)
})

export const ReadPage = (
    params = {
    pageIndex: 0,
    pageSize: 5,
    order:"asc",
    orderBy:"name",
    search:'',}
) => dispatch => {
    api.Catalog().readPage(params)
    .then(
        response => {
            dispatch({
                type: ACTION_TYPES.ENHANCED_FETCH,
                payload: response.data
            })
        }
    )
    .catch(err => console.log(err))
}

export const Create = (data, onSuccess) => dispatch => {
    data = formatData(data)
    api.Catalog().create(data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}

export const Update = (id, data, onSuccess) => dispatch => {
    data = formatData(data)
    api.Catalog().update(id, data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: { id, ...data }
        })
        onSuccess()
    })    .catch(err => console.log(err))

}

export const Delete = (id, onSuccess) => dispatch => {
    api.Catalog().delete(id)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}