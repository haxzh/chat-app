
import {axiosInstance} from './index.jsx'

export const signupUser = async (user) => {
    try {
        const response = await axiosInstance.post("/api/auth/signup", user);
        return response.data;
    }catch(error) {
        return error;
    }
}

export const loginUser = async (user) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", user);
        return response.data;
    }catch(error) {
        return error;
    }
}