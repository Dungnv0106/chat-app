import firebase, { db } from "./config";

export const addDocument = (collection, data) => {
  const query = db.collection(collection);

  query.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

// tạo keyword cho displayName, để làm tính năng search

export const generateKeywords = (displayName) => {
  const name = displayName.split(" ").filter((word) => word);
  console.log({ name });
  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];
  /**
   * Khởi tạo mảng flagArray dùng để đánh dấu xem giá trị tại vị trí này đã
   * được sử dụng hay chưa?
   */

  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }
  console.log(flagArray);
  const createKeywords = (name) => {
    const arrName = [];
    let curName = "";
    name.split("").forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };
  // Tìm hoán vị: permutation
  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(" "));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }
  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
