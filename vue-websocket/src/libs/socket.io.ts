import { io } from "socket.io-client";

const client = io("http://192.168.0.102:3001", {
  autoConnect: true,
});

export { client };
