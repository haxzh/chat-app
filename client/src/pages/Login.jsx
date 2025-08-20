import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apiCalls/auth.jsx";
import { showLoader, hideLoader } from "../redux/LoaderSlice";
import { useDispatch } from "react-redux"; // <-- Sahi import
import { toast } from 'react-hot-toast';

function Login(){
    const dispatch = useDispatch();
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });

    async function onFormSubmit(event){
        event.preventDefault();
        let response = null;
        try{
            dispatch(showLoader());
            response = await loginUser(user);
            dispatch(hideLoader());

            if(response.success){
                toast.success(response.message);
                localStorage.setItem('token', response.token);
                window.location.href = "/";
            }else{
                toast.error(response.message);
            }
        }catch(error){
            dispatch(hideLoader());
            toast.error(response.message);
        }
    }

    return (
        <div className="container">
        <div className="container-back-img"></div>
        <div className="container-back-color"></div>
        <div className="card">
        <div className="card_title">
            <h1>Login Here</h1>
        </div>
        <div className="form">
        <form onSubmit={ onFormSubmit }>
            <input type="email" placeholder="Email" 
            value={user.email}
            onChange={ (e) => setUser({...user, email: e.target.value})} />

            <input type="password" placeholder="Password"
            value={user.password}
            onChange={ (e) => setUser({...user, password: e.target.value})} />
            <button>Login</button>
        </form>
        </div>
        <div className="card_terms"> 
            <span>Don't have an account yet?
                <Link to="/signup">Signup Here</Link>
            </span>
        </div>
        </div>
    </div>
    )
}

export default Login;

// function Login() {
//   const dispatch = useDispatch(); // <-- Sahi tarika
//   const [user, setUser] = React.useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = React.useState("");
//   const navigate = useNavigate();

//   async function onFormSubmit(event) {
//     event.preventDefault();
//     setError("");
//     try {
//       dispatch(showLoader());
//       const response = await loginUser(user);
//       dispatch(hideLoader());
//       if (response.success && response.token) {
//         localStorage.setItem("token", response.token);
//         navigate("/"); // <-- Redirect
//       } else {
//         setError(response.message || "Login failed");
//       }
//     } catch (error) {
//       dispatch(hideLoader());
//       setError("Login failed. Please try again.");
//     }
//   }

//   return (
//     <div className="container">
//       <div className="container-back-img"></div>
//       <div className="container-back-color"></div>
//       <div className="card">
//         <div className="card_title">
//           <h1>Login Here</h1>
//         </div>
//         <div className="form">
//           <form onSubmit={onFormSubmit}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={user.email}
//               onChange={(e) => setUser({ ...user, email: e.target.value })}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={user.password}
//               onChange={(e) => setUser({ ...user, password: e.target.value })}
//               required
//             />
//             <button>Login</button>
//           </form>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//         </div>
//         <div className="card_terms">
//           <span>
//             Don't have an account yet? <Link to="/signup">Signup Here</Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;