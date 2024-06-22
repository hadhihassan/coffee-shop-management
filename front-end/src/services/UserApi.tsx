import { axiosInstance as axios, resolve, BASE_URL } from "@/config/Axios";


interface IUserLogin {
    email : string,
    password : string
}
interface IUserRegister {
    userName : string,
    email: string,
    password : string
}
export async function userLogin(data:IUserLogin) {
    return await axios.post(`${BASE_URL}/api/user/login/`, data)
    
}
export async function registerUser(data:IUserRegister) {
    return await resolve(
        axios.post(`${BASE_URL}/api/user/register/`, data)
    )
}
export async function GetAllProducts() {
    return await axios.get(`${BASE_URL}/api/user/products/`)
    
}