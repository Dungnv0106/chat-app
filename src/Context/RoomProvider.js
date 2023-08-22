import React, { createContext, useContext, useMemo, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirebase from "../hooks/useFirebase";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)

    // Lấy id của người dùng hiện tại
  const { user } = useContext(AuthContext);
  const { uid } = user;
  // console.log(uid);
  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirebase("rooms", roomsCondition);

  return <RoomContext.Provider value={{rooms, isAddRoomVisible, setIsAddRoomVisible}}>{children}</RoomContext.Provider>;
};

export default RoomProvider;
