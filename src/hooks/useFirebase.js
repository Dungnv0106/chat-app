import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirebase = (collection, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Lấy theo giờ gian mới nhất
    let collectionRef = db.collection(collection).orderBy('createdAt');
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        setDocuments([]);
        return;
      }
    /**
     * condition {
     *  fieldName: 'abc', 
     *  operator: '==',
     *  compareValue: 'abd'
     * }
     */
      // Điều kiện truy vấn
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );

    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });
    return unsubscribe;
  }, [collection, condition]);

  return documents;
};

export default useFirebase;
// Trả về các room mà người dùng là thành viên trong đó
