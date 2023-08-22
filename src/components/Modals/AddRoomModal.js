import { Form, Input, Modal } from "antd";
import React, { useContext, useState } from "react";
import { RoomContext } from "../../Context/RoomProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";

const AddRoomModal = () => {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(RoomContext);
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [form] = Form.useForm();
  //   console.log({form});
  const handleOk = () => {
    // console.log({formData: form.getFieldsValue()});
    // handle logic
    // add new room to firebase
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });
    // reset form value
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  return (
    <div>
      <Modal
        title="Tạo phòng mới"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item label="Mô tả " name="description">
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomModal;
