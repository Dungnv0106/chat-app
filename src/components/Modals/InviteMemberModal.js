import React, { useContext, useState } from "react";
import { RoomContext } from "../../Context/RoomProvider";
import { Form, Input, Modal, Select, Spin, Avatar } from "antd";
import { debounce } from "lodash";
import { db } from "../../firebase/config";
function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setLoading(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setLoading(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={loading ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} title={opt.label} value={opt.value}>
          <Avatar src={opt.photoURL} size="small">
            {opt.photoURL ? "" : opt.label?.chatAt(0)?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

// hàm lấy dữ liệu từ bảng user khi người dùng tìm kiếm
const fetchUserList = async (nameSearch, curMembers) => {
  return db
    .collection("users")
    .where("keywords", "array-contains", nameSearch)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL,
      })).filter((member) => !curMembers.includes(member.value))
    });
};
const InviteMemberModal = () => {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    roomSelected,
  } = useContext(RoomContext);
  const [form] = Form.useForm();
  const [value, setValue] = useState([]);
  const handleOk = () => {
    // update members in current room
    db.collection("rooms")
      .doc(selectedRoomId)
      .update({
        members: [...roomSelected.members, ...value.map((val) => val.value)],
      });
    // reset form value
    form.resetFields();
    setIsInviteMemberVisible(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsInviteMemberVisible(false);
  };
  // console.log({value});

  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            name="search-user"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curMembers={roomSelected.members}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default InviteMemberModal;
