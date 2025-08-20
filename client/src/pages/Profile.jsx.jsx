// import moment from 'moment';
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { showLoader, hideLoader } from '../redux/LoaderSlice';
// import {uploadProfilePic} from "../apiCalls/Users";
// import toast from "react-hot-toast";
// import { setUser } from "../redux/UserSlice";

// function Profile(){
//     const { user } = useSelector(state => state.userReducer);
//     const [image, setImage] = useState('');
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if(user?.profilePic){
//             setImage(user.profilePic);
//         }
//     }, [user])

//     function getInitials(){
//         let f = user?.firstname.toUpperCase()[0];
//         let l = user?.lastname.toUpperCase()[0];
//         return f + l;
//     }

//     function getFullname(){
//         let fname = user?.firstname.at(0).toUpperCase() + user?.firstname.slice(1).toLowerCase();
//         let lname = user?.lastname.at(0).toUpperCase() + user?.lastname.slice(1).toLowerCase();
//         return fname + ' ' + lname;
//     }

//     const onFileSelect = async (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader(file);

//         reader.readAsDataURL(file);

//         reader.onloadend = async () => {
//             setImage(reader.result);
//         }
//     }


//     // ...existing code...
//     const updateProfilePic = async () => {
//     try{
//         dispatch(showLoader());
//         const response = await uploadProfilePic(user._id, image); // <-- user._id bhi bhejo
//         dispatch(hideLoader());

//         if(response.success){
//             toast.success(response.message);
//             dispatch(setUser(response.data));
//         }else{
//             toast.error(response.message);
//         }
//     }catch(err){
//         toast.error(err.message);
//         dispatch(hideLoader());
//     }
// }
// // ...existing code...

//     return (
//         <div className="profile-page-container">
//         <div className="profile-pic-container">
//             {image && <img src={image} 
//                  alt="Profile Pic" 
//                  className="user-profile-pic-upload" 
//             />}
//             {!image && <div className="user-default-profile-avatar">
//                 { getInitials() }
//             </div>}
//         </div>

//         <div className="profile-info-container">
//             <div className="user-profile-name">
//                 <h1>{ getFullname() }</h1>
//             </div>
//             <div>
//                 <b>Email: </b> { user?.email}
//             </div>
//             <div>
//                 <b>Account Created: </b>{moment(user?.createdAt).format('MMM DD, YYYY')}
//             </div>
//             <div className="select-profile-pic-container">
//                 <input type="file" onChange={ onFileSelect } />
//                 <button className="upload-image-btn" onClick={updateProfilePic}>
//                     Upload
//                 </button>
//             </div>
//         </div>
//     </div>
//     )
// }

// export default Profile;


import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../redux/LoaderSlice";
import { uploadProfilePic } from "../apiCalls/Users";
import toast from "react-hot-toast";
import { setUser } from "../redux/UserSlice";

function Profile() {
  const { user } = useSelector((state) => state.userReducer);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.profilePic) {
      setImage(user.profilePic);
    }
  }, [user]);

  function getInitials() {
    if (!user) return "";
    let f = user?.firstname?.charAt(0)?.toUpperCase() || "";
    let l = user?.lastname?.charAt(0)?.toUpperCase() || "";
    return f + l;
  }

  function getFullname() {
    if (!user) return "";
    let fname =
      user?.firstname?.charAt(0)?.toUpperCase() +
      user?.firstname?.slice(1)?.toLowerCase();
    let lname =
      user?.lastname?.charAt(0)?.toUpperCase() +
      user?.lastname?.slice(1)?.toLowerCase();
    return fname + " " + lname;
  }

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const updateProfilePic = async () => {
    try {
      dispatch(showLoader());
      const response = await uploadProfilePic(user._id, image);
      dispatch(hideLoader());

      if (response.success) {
        toast.success(response.message);
        dispatch(setUser(response.data));
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
      dispatch(hideLoader());
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-pic-container">
        {image ? (
          <img
            src={image}
            alt="Profile Pic"
            className="user-profile-pic-upload"
          />
        ) : (
          <div className="user-default-profile-avatar">{getInitials()}</div>
        )}
      </div>

      <div className="profile-info-container">
        <div className="user-profile-name">
          <h1>{getFullname()}</h1>
        </div>
        <div>
          <b>Email: </b> {user?.email}
        </div>
        <div>
          <b>Account Created: </b>
          {user?.createdAt ? moment(user.createdAt).format("MMM DD, YYYY") : ""}
        </div>
        <div className="select-profile-pic-container">
          <input type="file" accept="image/*" onChange={onFileSelect} />
          <button className="upload-image-btn" onClick={updateProfilePic}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
