import { CAllS3ServiceToStore, uploadFileToSignedUelInS3 } from "@/services/awsS3Api";
import { AxiosError, AxiosResponse } from "axios";
import { ChangeEvent } from "react";

export function uploadPhoto(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files && e.target.files.length > 0) {
        const file: File = e.target.files[0];
        const content_type: string = file.type;
        const key: string = `test/image/${file.name}`;
        CAllS3ServiceToStore({ key, content_type })
            .then((res: AxiosResponse) => {
                uploadFileToSignedUelInS3(res.data.signedUrl, file, content_type, () => {
                }).then((res) => {
                    console.log(res)
                    
                }).catch((error: AxiosError) => {
                    console.error("Error uploading file: firsrt one ", error);
                });
            })
            .catch((error: AxiosError) => {
                console.error("Error uploading file:", error);
            });
    }
}