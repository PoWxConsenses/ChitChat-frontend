import axios from "axios";
const API = process.env.REACT_APP_BACKEND_URL;
export const sendFriendRequest = async ({ message, userId }) => {
  const response = await axios({
    method: "POST",
    url: `${API}/api/connect/${userId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
  });
  return response.status == 200 ? true : false;
};
