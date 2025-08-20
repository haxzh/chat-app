// import { axiosInstance, url } from "./index";

// export async function getLoggedUser() {
//   try {
//     const response = await axiosInstance.get("/api/user/get-logged-user");
//     return response.data;
//   } catch (error) {
//     // console.error(error);
//     return error;
//   }
// }
// // your API call logic here



// export async function getAllUsers() {
//   try {
//     const response = await axiosInstance.get("/api/user/get-all-user");
//     return response.data;
//   } catch (error) {
//     // console.error(error);
//     return error;
//   }
// }


// // USE THIS CODE

// export const uploadProfilePic = async (image) => {
//     try{
//         const response = await axiosInstance.post(url + 'api/user/upload-profile-pic', { image });
//         return response.data;
//     }catch(error){
//         return error;
//     }
// }

// // export const uploadProfilePic = async (image) => {
// //   try {
// //     const response = await axiosInstance.post(
// //       "/api/user/upload-profile-pic",  // direct relative path
// //       { image }
// //     );
// //     return response.data;
// //   } catch (error) {
// //     return error;
// //   }
// // };














import { axiosInstance } from "./index";

export async function getLoggedUser() {
  try {
    const response = await axiosInstance.get("/api/user/get-logged-user");
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getAllUsers() {
  try {
    const response = await axiosInstance.get("/api/user/get-all-user");
    return response.data;
  } catch (error) {
    return error;
  }
}

// Sahi: Local ya deployed backend ke liye relative path use karo
export const uploadProfilePic = async (userId, image) => {
  try {
    const response = await axiosInstance.post(
      "/api/user/upload-profile-pic",
      { userId, image }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};