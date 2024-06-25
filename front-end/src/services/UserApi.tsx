import { axiosInstance as axios, resolve, BASE_URL } from "@/config/Axios";


interface IUserLogin {
    email: string,
    password: string
}
interface IUserRegister {
    userName: string,
    email: string,
    password: string
}
export async function userLogin(data: IUserLogin) {
    return await axios.post(`${BASE_URL}/api/user/login/`, data)

}
export async function registerUser(data: IUserRegister) {
    return await resolve(
        axios.post(`${BASE_URL}/api/user/register/`, data)
    )
}
export async function GetAllProducts() {
    return await axios.get(`${BASE_URL}/api/user/products/`)

}

// Cart service
export async function addToCart(productId: string) {
    return await axios.post(`${BASE_URL}/api/user/products/add-to-cart/`, { productId: productId })

}
export async function reduceItemFromCart(productId: string) {
    return await axios.post(`${BASE_URL}/api/user/products/minus-to-cart/`, { productId :productId})

}

export async function getCartProducts() {
    return await axios.get(`${BASE_URL}/api/user/cart/`)
}

export async function createOrder() {
    return await axios.post(`${BASE_URL}/api/user/order/create/`)
}
export async function getMyOrders() {
    return await axios.get(`${BASE_URL}/api/user/order/`)
}