import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    timeout: 20000,
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': '*',
    //     Accept: '*/*',
    //     'Access-Control-Allow-Credentials': 'true',
    //     Authorization: 'Basic djRsMHJfX24zdEB1MzNrKjEwOTIzOF8yMDIxIzo0cGlAY2Nlc3NfdkBsb3IqKm5ldCVMb29iMzMqMjAyMQ==',
    // },
})

const fetcher = async (url: string) => {
    const response = await api.get(url)
    return response.data
}

export { api, fetcher }

// api.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     async (error) => {
//         if (error?.response?.status == 401) {
//             // redirect to login
//         }

//         return Promise.reject(error)
//     },
// )
