import React, { useContext } from "react";
import { Button, Collapse, Typography } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import useFirebase from "../../hooks/useFirebase";
import { AuthContext } from "../../Context/AuthProvider";
import { RoomContext } from "../../Context/RoomProvider";
const { Panel } = Collapse;
// border: 1px solid red;
// &&&: sẽ tạp ra 3 class có độ ưu tiên cao hơn để overwrite
const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 5px 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

const RoomList = () => {
  const { rooms, setIsAddRoomVisible } = useContext(RoomContext);
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  }
  // console.log({ rooms });
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách các phòng" key="1">
        {rooms?.map((room) => {
          return <LinkStyled key={room.id}>{room.name}</LinkStyled>;
        })}
        {/* <LinkStyled>Room 1</LinkStyled>
        <LinkStyled>Room 2</LinkStyled>
        <LinkStyled>Room 3</LinkStyled> */}
        <Button type="text" icon={<PlusSquareOutlined />} className="add-room" onClick={handleAddRoom}>
          Thêm phòng
        </Button>
      </PanelStyled>
    </Collapse>
  );
};

export default RoomList;
