import React from 'react';
import { Link } from "react-router-dom";
import { signupUser } from '../apiCalls/auth';
import { showLoader, hideLoader } from '../redux/LoaderSlice';
import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux"; // <-- yeh import add karein

function Signup(){
    const dispatch = useDispatch();
    const [user, setUser] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    async function onFormSubmit(event){
        event.preventDefault();
        let response = null;
        try{
            dispatch(showLoader());
            response = await signupUser(user);
            dispatch(hideLoader());

            if(response.success){
                toast.success(response.message);
            }else{
                toast.error(response.message);
            }
        }catch(err){
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
                <h1>Create Account</h1>
            </div>
            <div className="form">
                <form onSubmit={ onFormSubmit }>
                    <div className="column">
                        <input type="text" placeholder="First Name" 
                            value={user.firstname} 
                            onChange={(e) => setUser({...user, firstname: e.target.value})} />
                        <input type="text" placeholder="Last Name" 
                            value={ user.lastname }
                            onChange={(e) => setUser({...user, lastname: e.target.value})}/>
                    </div>
                    <input type="email" placeholder="Email" 
                        value={ user.email }
                        onChange={(e) => setUser({...user, email: e.target.value})}/>
                    <input type="password" placeholder="Password" 
                        value={ user.password }
                        onChange={(e) => setUser({...user, password: e.target.value})}/>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="card_terms">
                <span>Already have an account?
                    <Link to="/login">Login Here</Link>
                </span>
            </div>
        </div>
    </div>
    )
}

export default Signup;





// function Signup() {
//     const dispatch = useDispatch(); // <-- yeh sahi hai

//     const [user, setUser] = React.useState({
//         firstname: "",
//         lastname: "",
//         email: "",
//         password: ""
//     });

//     async function onFormSubmit(event) {
//         event.preventDefault();

//         try {
//             dispatch(showLoader());
//             const response = await signupUser(user);
//             dispatch(hideLoader());
//             if (response.success) {
//                 toast.success(response.message);
//             } else {
//                 toast.error(response.message);
//             }
//         } catch (err) {
//             dispatch(hideLoader());
//             toast.error("Signup failed. Please try again.");
//         }
//     }

//     return (
//         <div className="container">
//             <div className="container-back-img"></div>
//             <div className="container-back-color"></div>
//             <div className="card">
//                 <div className="card_title">
//                     <h1>Create Account</h1>
//                 </div>
//                 <div className="form">
//                     <form onSubmit={onFormSubmit}>
//                         <div className="column">
//                             <input type="text" placeholder="First Name" value={user.firstname}
//                                 onChange={(e) => setUser({ ...user, firstname: e.target.value })} />
//                             <input type="text" placeholder="Last Name" value={user.lastname}
//                                 onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
//                         </div>
//                         <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
//                         <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
//                         <button>Sign Up</button>
//                     </form>
//                 </div>
//                 <div className="card_terms">
//                     <span>Already have an account?
//                         <Link to="/login">Login Here</Link>
//                     </span>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Signup;