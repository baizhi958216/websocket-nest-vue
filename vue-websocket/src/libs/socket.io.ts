import { io } from "socket.io-client";

const client = io("http://localhost:3001", {
  autoConnect: true,
});

export { client };
