import { axiosInstance } from "./index";

export async function getLoggedUser() {
  try {
    const response = await axiosInstance.get("/api/user/get-logged-user");
    return response.data;
  } catch (error) {
    // console.error(error);
    return error;
  }
}
// your API call logic here



export async function getAllUsers() {
  try {
    const response = await axiosInstance.get("/api/user/get-all-user");
    return response.data;
  } catch (error) {
    // console.error(error);
    return error;
  }
}