import React, { useContext } from "react";
import styled from "styled-components";
import { Button, Avatar, Tooltip, Input, Form, Alert } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Message from "./Message";
import { RoomContext } from "../../Context/RoomProvider";

const WrapperStyled = styled.div`
  height: 100vh;
  padding: 0 0 30px 0;
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
  border: 1px solid red;
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
  padding: 20px 0;
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
  const { roomSelected, members, setIsInviteMemberVisible } =
    useContext(RoomContext);

  return (
    <WrapperStyled>
      {roomSelected.id ? (
        <>
          <HeaderStyled>
            <div className="header__infor">
              <p className="header__name">{roomSelected?.name}</p>
              <span className="header__desc">{roomSelected?.description}</span>
            </div>
            <ButtonGroupStyled>
              <Button
                type="text"
                icon={<UserAddOutlined />}
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
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
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng ở danh sách phòng^^"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closeIcon
          closable
        />
      )}
    </WrapperStyled>
  );
};

export default ChatWindow;
