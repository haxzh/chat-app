import { useSelector } from 'react-redux';
import Header from './homecomponents/Header'
import Sidebar from './homecomponents/Sidebar'
import ChatArea from './homecomponents/Chat'
function Home() {
  const {selectedChat} = useSelector((state) => state.userReducer);
  return (
    <div className="home-page">
      <Header ></Header>
    <div className="main-content">
      <Sidebar></Sidebar>

         {selectedChat && <ChatArea></ChatArea>}
    </div>
</div>

  );
}

export default Home;
