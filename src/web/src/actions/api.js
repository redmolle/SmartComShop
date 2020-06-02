import axios from 'axios'
import React from 'react'
const baseUrl = 'http://localhost:7000/api/'


const buildQuery = (page, pageSize, order=null, orderBy=null, search=null) => {
    let query = `?pageIndex=${page}&pageSize=${pageSize}` 
    if (order !== null)
    {
        query += `&order=${order}`
    }
    if (orderBy !== null)
    {
        query += `&orderBy=${orderBy}`
    }
    if (search !== null)
    {
        query += `&search=${search}`
    }
    console.log(query)
    return query
}

export default {
    Catalog(url=baseUrl + 'catalog/items/'){
        return {
            fetchAll: () => axios.get(url),
            fetchByPage : (page, pageSize) => axios.get(url + buildQuery(page, pageSize)),
            orderedFetch: (page, pageSize, order, orderBy) => axios.get(url + buildQuery(page, pageSize, order, orderBy)),
            enhancedFetch: (page, pageSize, order, orderBy, search) => axios.get(url + buildQuery(page, pageSize, order, orderBy, search)),
            fetchById : id => axios.get(url + id),
            create : newRecord => axios.post(url, newRecord),
            update : (id, updateRecord) => axios.put(url + id, updateRecord),
            delete : id => axios.delete(url + id)
        }
    }
}