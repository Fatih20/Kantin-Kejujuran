import axios from "axios";
import { callLimit, CLOUDINARY } from "../config";
import { errorHandlingWrapperCloudinary, errorHandlingWrapperImgBB, errorHandlingWrapperImgur, fetchDataRetry } from "./utilities";

// export async function uploadImage (image) {
//     return fetchDataRetry(() => errorHandlingWrapperImgur("/upload", {image , type : "file"}, "post"), 0, callLimit);
// }

// export async function uploadImage(image) {
//     console.log(image);
//     return fetchDataRetry(() => errorHandlingWrapperImgBB("/upload", image, "post"), 0, callLimit);
// }

// export async function uploadImage(image) {
//     console.log(image);
//     return fetchDataRetry(() => errorHandlingWrapperPublitio(image), 0, callLimit);
// }

export async function uploadImage(image) {
    console.log(image);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY.preset)
    return fetchDataRetry(() => errorHandlingWrapperCloudinary(formData), 0, callLimit);
}

