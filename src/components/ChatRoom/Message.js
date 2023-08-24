import React from "react";
import { Avatar, Typography } from "antd";
import { styled } from "styled-components";
import { formatRelative } from "date-fns/esm";
const WrapperStyled = styled.div`
  margin-bottom: 10px;
  .username {
    margin-left: 5px;
    font-weight: bold;
  }
  .time {
    margin-left: 10px;
    font-size: 12px;
    color: #a7a7a7;
  }
  .content {
    margin-left: 30px;
  }
`;
// hàm chuyển đổi thời gian
function formatDate(seconds) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

const Message = ({ displayName, photoURL, text, createdAt }) => {
  return (
    <WrapperStyled>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src={photoURL}>
            {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
        <Typography.Text className="time">{formatDate(createdAt?.seconds)}</Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{text}</Typography.Text>
      </div>
    </WrapperStyled>
  );
};

export default Message;
