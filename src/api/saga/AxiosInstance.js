import axios from "axios";

const apiUrl = process.env.REACT_APP_SERVER_URL

export const instance = axios.create({
    withCredentials: 'include',
    baseURL: apiUrl,
})

export const formInstance = axios.create({
    headers: {
        "Content-type": "multipart/form-data",
    },
    withCredentials: 'include',
    baseURL: apiUrl,
})
