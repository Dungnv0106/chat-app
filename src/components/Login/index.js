import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Typography, Button } from "antd";
import firebase, { auth, db } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";
const { Title } = Typography;

// tạo 1 nhà cung cấp
const fbProvider = new firebase.auth.FacebookAuthProvider();
// console.log(fbProvider);

const Login = () => {
  const handleFbLogin = async () => {
    const data = await auth.signInWithPopup(fbProvider);
    // console.log( data );
    const { additionalUserInfo, user } = data;
    // console.log(additionalUserInfo);
    // Kiểm tra xem có phải là người dùng mới hay không.
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8} style={{}}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button
            style={{
              width: "100%",
              marginBottom: 5,
              fontSize: "18px",
              lineHeight: "20px",
            }}
            // onClick={() => handleLogin(googleProvider)}
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            style={{ width: "100%", fontSize: "18px", lineHeight: "20px" }}
            onClick={handleFbLogin}
          >
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
