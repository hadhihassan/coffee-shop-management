import { axiosInstance as axios, resolve, BASE_URL } from "@/config/Axios";

interface AdminLogin {
    email: string,
    password: string
}
export async function adminLogin(data: AdminLogin) {
    return await resolve(
        axios.post(`${BASE_URL}/api/admin/login/`, data)
    );
}

export async function createProduct(data: FormData) {
    return await resolve(
        axios.post(`${BASE_URL}/api/admin/product/create/`, data)
    );
}
export async function getAllProduct() {
    return await resolve(
        axios.get(`${BASE_URL}/api/admin/product/get-products/`)
    );
}

export async function getAllOrder() {
    return await resolve(
        axios.get(`${BASE_URL}/api/admin/order/`)
    );
}
export async function updateStatus(orderId: string, status: string) {
    return await resolve(
        axios.patch(`${BASE_URL}/api/admin/order/update`, { orderId, status })
    );
}
export async function deleteOrder(orderId: string) {
    return await resolve(
        axios.patch(`${BASE_URL}/api/admin/order/delete/`, { orderId })
    );
}   