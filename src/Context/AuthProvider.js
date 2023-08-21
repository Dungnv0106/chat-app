import React, { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Trạng thái khi đăng nhập thành công: Ktra xem ng dùng đã đăng nhập thành công chưa

    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log({ user });
      // Đăng nhập thành công thì điều hướng về trang chủ với hook useHistory
      if (user) {
        const { phoneNumber, displayName, photoURL, uid, email } = user;
        setUser({
          phoneNumber: phoneNumber,
          displayName: displayName,
          phoneNumberUrl: photoURL,
          uid: uid,
          email: email,
        });
        setIsLoading(false);
        navigate("/");
        return;
      } else {
        setIsLoading(false);
        navigate("/login");
      }
    });
    // cleanup function
    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
