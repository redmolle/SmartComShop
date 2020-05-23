import axios from "axios";

const baseUrl = "http://localhost:7000/api/"

const baseHeaders = {
    headers: {
        'Content-Type': 'application/json',
    }
}

export default {
    Catalog(url=baseUrl + 'catalog/items/'){
        return {
            fetchAll : () => axios.get(url),
            fetchById : id => axios.get(url + id),
            create : newRecord => axios.post(url, JSON.stringify(newRecord), baseHeaders),
            update : (id, updateRecord) => axios.put(url + id, updateRecord),
            delete : id => axios.delete(url + id)
        }
    }
}