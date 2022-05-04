import io from "socket.io-client";
const END_POINT = "localhost:4000";
export const socket = io(END_POINT);
