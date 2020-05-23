import api from './api';

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE : 'UPDATE',
    DELETE : 'DELETE',
    FETCH_ALL : 'FETCH_ALL'
}

const formatData = data => ({
    ...data,
    price:Number(data.price)
})

export const FetchAll = () => dispatch => {
    api.Catalog().fetchAll()
    .then(
        response => {
            console.log(response)
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data.data
            })
        }
    )
    .catch(err => console.log(err))
}

export const Create = (data, onSuccess) => dispatch => {
    data = formatData(data)
    api.Catalog().create(data)
    .then(
        response => {
            console.log(response)
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: response.data
        })
        onSuccess()
    })
    .catch(err => {console.log(err); console.log(111)})
}

export const Update = (id, data, onSuccess) => dispatch => {
    data = formatData(data)
    api.Catalog().update(id.data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: { id, ...data }
        })
        onSuccess()
    })
    .catch(err => console.log(err))
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