import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://dashing-dragon.onrender.com";
// const URL = "http://localhost:4040";

export const socket = io(URL);
