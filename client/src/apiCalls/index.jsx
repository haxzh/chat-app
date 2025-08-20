// import axios from "axios";

// export const axiosInstance = axios.create({
//     headers: {
//         authorization: `Bearer ${localStorage.getItem("token")}`
//     }
// });

import axios from "axios";

export const url = "https://chat-app-server-trai.onrender.com/";

export const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
});