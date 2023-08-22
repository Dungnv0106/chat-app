import React, { useContext, useEffect } from "react";
import { Row, Col, Collapse, Button, Avatar, Typography } from "antd";
import { styled } from "styled-components";
import { auth, db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
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

  const data = useContext(AuthContext);
  // console.log(data);
  const {user : {
    displayName, 
    photoURL,
  }} = data;


  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>{photoURL ? "" : displayName?.charAt(0).toUpperCase()}</Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button ghost className="log-out" onClick={() => auth.signOut()}>
        Log out
      </Button>
    </WrapperStyled>
  );
};

export default UserInfo;
