import axiosInstance, { BASE_URL } from "@/config/Axios";

export async function CAllS3ServiceToStore(data: unknown) {
    return await axiosInstance.post(`${BASE_URL}/api/admin/aws-signed-url/`, data)
}
export async function uploadFileToSignedUelInS3(signedUrl: string, file: File | null, content_type: string, onProgress: () => void) {
    return await axiosInstance.put(signedUrl, file, {
        headers: {
            "Content-Type": content_type,
        },
        onUploadProgress: onProgress,
    });
}