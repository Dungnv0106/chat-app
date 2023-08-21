import React from "react";
import styled from "styled-components";
import { Button, Avatar, Tooltip, Input, Form } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Message from "./Message";

const WrapperStyled = styled.div`
  height: 100vh;
  border: 1px solid red;

`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 15px;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header__infor {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .header__name {
    margin: 0;
    font-weight: bold;
  }
  .header__desc {
    font-size: 14px;
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;
const ContentStyled = styled.div`
  height: calc(100% - 56px);
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  
  .ant-form-item {
    flex: 1;
    margin: 0;
  }
`;
const ChatWindow = () => {
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header__infor">
          <p className="header__name">Tên Phòng</p>
          <span className="header__desc">Mô tả của phòng</span>
        </div>
        <ButtonGroupStyled>
          <Button type="text" icon={<UserAddOutlined />}>
            Mời
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="B">
              <Avatar>B</Avatar>
            </Tooltip>
            <Tooltip title="C">
              <Avatar>C</Avatar>
            </Tooltip>
            <Tooltip title="D">
              <Avatar>D</Avatar>
            </Tooltip>
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>

      <ContentStyled>
        {/* Hiển thị tin nhắn */}
        <MessageListStyled>
          <Message
            text="Anh đi đâu đấy anh"
            photoURL={null}
            displayName="Dũng"
            createdAt="123456"
          />
          <Message
            text="Anh đi đâu đấy anh"
            photoURL={null}
            displayName="Dũng"
            createdAt="123456"
          />
          <Message
            text="Anh đi đâu đấy anh"
            photoURL={null}
            displayName="Dũng"
            createdAt="123456"
          />
          <Message
            text="Anh đi đâu đấy anh"
            photoURL={null}
            displayName="Dũng"
            createdAt="123456"
          />
        </MessageListStyled>
        {/* Form gửi tin nhắn */}
        <FormStyled>
          <Form.Item>
            <Input
              bordered={false}
              autoComplete="off"
              placeholder="Nhập tin nhắn..."
            />
          </Form.Item>
          <Button type="primary">Gửi</Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  );
};

export default ChatWindow;
