import React from "react";
import { Row, Col, Collapse, Button, Avatar, Typography } from "antd";
import { styled } from "styled-components";
import { auth } from "../../firebase/config";
// console.log(auth) ;
// ghost: trong suốt
const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
 
`;

const UserInfo = () => {
  // const signOut = () => {
  //   // console.log('hihi');
  //   auth.signOut();
  // }
  return (
    <WrapperStyled>
      <div>
        <Avatar>ABC</Avatar>
        <Typography.Text className="username">ABC</Typography.Text>
      </div>
      <Button ghost className="log-out" onClick={(() => auth.signOut())}>Log out</Button>
    </WrapperStyled>
  );
};

export default UserInfo;
