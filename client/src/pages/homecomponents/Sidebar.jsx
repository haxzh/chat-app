import { useState } from "react";
import Search from "./Search";
import UsersList from "./UserLIst";

// function Sidebar() {
//   const [searchKey, setSearchKey] = useState("");
//   return (
//     <div className="app-sidebar">
//       <Search searchKey={searchKey} setSearchKey={setSearchKey}></Search>
//       <UserList searchKey={searchKey}></UserList>
  


     
     
//     </div>
//   );
// }

// export default Sidebar;




function Sidebar({ socket, onlineUser }){
    const [searchKey, setSearchKey] = useState('');
    return (
        <div className="app-sidebar">
            <Search 
                searchKey={searchKey} 
                setSearchKey={setSearchKey}>               
            </Search>
            <UsersList 
                searchKey={searchKey} 
                socket={socket}
                onlineUser={onlineUser}
            >
            </UsersList>
        </div>
    )
}

export default Sidebar;