import React, { createContext, useContext, useMemo, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirebase from "../hooks/useFirebase";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  // Lấy id của người dùng hiện tại
  const { user } = useContext(AuthContext);
  const { uid } = user;
  // console.log(uid);
  // Tìm kiếm tất cả các phòng mà người dùng là thành viên
  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirebase("rooms", roomsCondition);

  const roomSelected = React.useMemo(() => { 
    return rooms.find(room => room.id === selectedRoomId) || {};
  }, [rooms, selectedRoomId]);

  // Lấy những member có trong room hiện tại(roomselected)

  const userCondition = useMemo(() => {
    return {
      fieldName: "uid", 
      operator: "in", 
      compareValue: roomSelected.members
    }
  }, [roomSelected.members]);

  const members = useFirebase('users', userCondition);
  // console.log({members});
  return (
    <RoomContext.Provider
      value={{ 
        rooms, 
        isAddRoomVisible, 
        setIsAddRoomVisible, 
        selectedRoomId, 
        setSelectedRoomId, 
        roomSelected, 
        members,
        isInviteMemberVisible, 
        setIsInviteMemberVisible
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
