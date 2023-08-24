import "./App.css";
import { Route, Routes, Switch } from "react-router-dom";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import RoomProvider from "./Context/RoomProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RoomProvider>
          <Routes>
            <Route path="/" element={<ChatRoom />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
        </RoomProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
