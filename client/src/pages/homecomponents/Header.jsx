import React from 'react'
import { useSelector  } from 'react-redux';
function Header() {
  const { user }= useSelector(state => state.userReducer);

  console.log(user);



  function getFullName() {
    let fname = user?.firstname?.toUpperCase();
    let lname = user?.lastname?.toUpperCase();
    return fname +' '+ lname;
  }

  function getInitials() {
    
    let f = user?.firstname?.toUpperCase()[0];
    let l = user?.lastname?.toUpperCase()[0];
    return f + l;
  }

  return (
    <div>
        <div className="app-header">
    <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
           Chat App
        </div>
    <div className="app-user-profile">
        <div className="logged-user-name">{getFullName()}</div>
        <div className="logged-user-profile-pic">{getInitials()}</div>
    </div>
</div>

      
    </div>
  )
}

export default Header
