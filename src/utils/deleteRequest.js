import axios from "axios";
const API = process.env.REACT_APP_BACKEND_URL;
export const acceptFriendRequest = async (userId) => {
  const response = await axios({
    method: "DELETE",
    url: `${API}/api/connect/${userId}/accept`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
  });
  return response.status == 200 ? true : false;
};

export const ignoreFriendRequest = async (userId) => {
  const response = await axios({
    method: "DELETE",
    url: `${API}/api/connect/${userId}/ignore`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
  });
  return response.status == 200 ? true : false;
};
