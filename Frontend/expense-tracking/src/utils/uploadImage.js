import { ApiPaths } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    
    try {
        const response = await axiosInstance.post(ApiPaths.PROFILE.UPLOAD_PROFILE_PIC, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


export default uploadImage;

