import axios from 'axios'
import React from 'react'
import { getCookie } from '../components/users/Cookie'
const baseUrl = 'http://192.168.0.111:7000/api/'

const config = {
    headers: {
        Authorization: `Bearer ${getCookie('token')}`
    }
}

const buildQuery = (params) => {
    const queryParam = (string, value) => {
        return value && `${string}=${value}`
    }
    let query = Object.keys(params).map((key) => {
        const value = params[key]
        if (value) {
            return key + '=' + value
        }
    })
    .join('&')
    query = query === "" ? "" : `?${query}`
    return query
}

export default {
    Catalog(url=baseUrl + 'catalog/items/'){
        return {
            readPage: (params) => axios.get(url + buildQuery(params)),
            fetchById : id => axios.get(url + id),
            create : newRecord => axios.post(url, newRecord, config),
            update : (id, updateRecord) => axios.put(url + id, updateRecord, config),
            delete : id => axios.delete(url + id, config),
        }
    },
    Cart(url=baseUrl + 'cart/customerId/'){
        return{
            read: (customerId) => axios.get(url + customerId),
            addItem: (customerId, itemId) => axios.put(url + customerId + `?itemId=${itemId}`),
            deleteItem: (customerId, itemId) => axios.put(url + customerId + `?itemId=${itemId}`),
            delete: (customerId) => axios.delete(url + customerId),
        }
    },
    User(url=baseUrl + 'auth/'){
        return {
            token: (body) => axios.post(url + 'token', body)
        }
    }
}