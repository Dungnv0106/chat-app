import React, { useContext, useMemo, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Avatar, Tooltip, Input, Form, Alert, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Message from "./Message";
import { RoomContext } from "../../Context/RoomProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import useFirebase from "../../hooks/useFirebase";

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
  // console.log({roomSelected});
  const { user } = useContext(AuthContext);
  const { uid, photoURL, displayName } = user;
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  const [form] = Form.useForm();
  //
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  //
  const handleOnSubmit = () => {
    addDocument("messages", {
      uid,
      text: inputValue,
      photoURL,
      displayName,
      roomId: roomSelected.id,
    });
    // reset nội dung ô input
    form.resetFields(["message"]);
    // focus vào lại input khi gửi xong tin nhắn
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };

  const messageCondition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: roomSelected.id,
    };
  }, [roomSelected.id]);

  // lấy ra những tin nhắn thuộc room hiện tại bằng cách so sánh roomId
  const messages = useFirebase("messages", messageCondition);
  // console.log(messages);
  useEffect(() => {
    // Cuốn xuống cuối khi tin nhắn thay đổi
    if (messageListRef?.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);
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
            <MessageListStyled ref={messageListRef}>
              {messages?.map((message) => (
                <Message
                  key={message.id}
                  text={message.text}
                  photoURL={message.photoURL}
                  displayName={message.displayName}
                  createdAt={message.createdAt}
                />
              ))}
            </MessageListStyled>
            {/* Form gửi tin nhắn */}
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  ref={inputRef}
                  bordered={false}
                  autoComplete="off"
                  placeholder="Nhập tin nhắn..."
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                />
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit}>
                Gửi
              </Button>
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
