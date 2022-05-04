import axios from "axios";
const API = process.env.REACT_APP_BACKEND_URL;
export const updateChat = async (chatId, data) => {
  try {
    const response = await axios({
      method: "PATCH",
      url: `${API}/api/chat/${chatId}`,
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    if (response.status === 200) {
    }
  } catch (err) {
    console.log(err.message);
  }
};
