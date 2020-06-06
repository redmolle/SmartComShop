import Cookies from 'universal-cookie';
export const setCookie = (name, value) => {

    const cookie = new Cookies()
    cookie.set(name, value, {path:'/'})
}
export const getCookie = (name=null) => {
    const cookie = new Cookies()
    return name === null
    ? cookie.getAll()
    : cookie.get(name)
}