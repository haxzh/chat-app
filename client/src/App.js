import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Toaster } from  "react-hot-toast"
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile.jsx.jsx";

function App() {
  const { loader } = useSelector(state => state.loaderReducer);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      { loader && <Loader /> }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute> }>
          </Route>
          <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute> }>
          </Route>
          <Route path="/login" element={<Login /> }></Route>
          <Route path="/signup" element={<Signup /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


// function App() {
//   const {loader} = useSelector(state => state.loaderReducer);
//   return (
//     <div>
//       <Toaster position="top-center" reverseOrder={false} />
//        { loader && <Loader />}
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

