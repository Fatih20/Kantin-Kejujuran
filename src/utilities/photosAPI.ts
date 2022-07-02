import { callLimit, CLOUDINARY } from "../config";
import { errorHandlingWrapperCloudinary, fetchDataRetry } from "./utilities";

export async function uploadImage(image) {
    console.log(image);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY.preset)
    return fetchDataRetry(() => errorHandlingWrapperCloudinary(formData), 0, callLimit);
}

