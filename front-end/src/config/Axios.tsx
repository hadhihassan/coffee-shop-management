import axios, { InternalAxiosRequestConfig, AxiosInstance } from 'axios';

export const BASE_URL: string = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
});

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const userJwtToken = localStorage.getItem("UserAccessToken");
    const adminJwtToken = localStorage.getItem("AdminAccessToken");
    config.headers = config.headers || {};
    config.headers['authorization'] = `Bearer ${userJwtToken || adminJwtToken}`;
    return config;
};

axiosInstance.interceptors.request.use(onRequest);

export default axiosInstance;


interface resolve {
    data: unknown | null;
    error: ErrorResponse | null;
}
interface ErrorResponse {
    response?: {
        data?: {
            isBlocked?: boolean;
        };
    };
}
export async function resolve(promise: Promise<unknown> | PromiseLike<null> | null) {
    const resolved: resolve = {
        data: null,
        error: null
    };
    try {
        resolved.data = await promise
    } catch (e) {
        resolved.error = e as ErrorResponse;
    }
    return resolved;
}
