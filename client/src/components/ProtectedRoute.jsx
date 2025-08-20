import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, getAllUsers } from "../apiCalls/Users";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../redux/LoaderSlice";
import { toast } from "react-hot-toast";
import { setUser, setAllUsers, setAllChats } from "../redux/UserSlice";
import { getAllChats } from "../apiCalls/Chat";

function ProtectedRoute({children}){
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const navigate = useNavigate();
 
    const getloggedInUser = async () => {
        let response = null;
        try{
            dispatch(showLoader())
            response = await getLoggedUser();
            dispatch(hideLoader())

            if(response.success){
                dispatch(setUser(response.data));
            }else{
                toast.error(response.message);
                window.location.href = '/login';
            }
        }catch(error){
            dispatch(hideLoader())
            navigate('/login');
        }
    }

    const getAllUsersFromDb = async () => {
        let response = null;
        try{
            dispatch(showLoader());
            response = await getAllUsers();
            dispatch(hideLoader());

            if(response.success){
                dispatch(setAllUsers(response.data));
            }else{
                toast.error(response.message);
                window.location.href = '/login';
            }
        }catch(error){
            dispatch(hideLoader())
            navigate('/login');
        }
    }

    const getCurrentUserChats = async () => {
        try{
            const response = await getAllChats();
            if(response.success){
                dispatch(setAllChats(response.data))
            }
        }catch(error){
            navigate('/login');
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            getloggedInUser();
            getAllUsersFromDb();
            getCurrentUserChats();
        }else{
            navigate('/login');
        }
    }, []);

    return (
        <div>
            { children }
        </div>
    );
}

export default ProtectedRoute;


// function ProtectedRoute({ children }) {
//   const { user } = useSelector((state) => state.userReducer);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLoggedUser = async () => {
//       try {
//         dispatch(showLoader());
//         const response = await getLoggedUser();
//         dispatch(hideLoader());
//         if (response.success) {
//           dispatch(setUser(response.data));
//         } else {
//           toast.error(response.message);
//           navigate("/login");
//         }
//       } catch (error) {
//         dispatch(hideLoader());
//         navigate("/login");
//       }
//     };

//     const fetchAllUsers = async () => {
//       try {
//         dispatch(showLoader());
//         const response = await getAllUsers();
//         dispatch(hideLoader());
//         if (response.success) {
//           dispatch(setAllUsers(response.data));
//         } else {
//           toast.error(response.message);
//           navigate("/login");
//         }
//       } catch (error) {
//         dispatch(hideLoader());
//         navigate("/login");
//       }
//     };

//     const fetchAllChats = async () => {
//       try {
//         dispatch(showLoader());
//         const response = await getAllChats();
//         dispatch(hideLoader());
//         if (response.success) {
//           dispatch(setAllChats(response.data));
//         } else {
//           toast.error(response.message);
//           navigate("/login");
//         }
//       } catch (error) {
//         dispatch(hideLoader());
//         navigate("/login");
//       }
//     };

//     if (localStorage.getItem("token")) {
//       fetchLoggedUser();
//       fetchAllUsers();
//       fetchAllChats();
//     } else {
//       navigate("/login");
//     }
//     // eslint-disable-next-line
//   }, [navigate, dispatch]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return <>{children}</>;
// }

// export default ProtectedRoute;