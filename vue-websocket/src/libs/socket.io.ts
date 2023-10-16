import { io } from "socket.io-client";

const client = io(`${import.meta.env.VITE_SOCKET_PORT}`, {
  autoConnect: true,
});

export { client };
