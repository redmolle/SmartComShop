import axios from 'axios'
import React from 'react'
const baseUrl = 'http://localhost:7000/api/'


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
            create : newRecord => axios.post(url, newRecord),
            update : (id, updateRecord) => axios.put(url + id, updateRecord),
            delete : id => axios.delete(url + id)
        }
    }
}