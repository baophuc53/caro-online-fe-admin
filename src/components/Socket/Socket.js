import socketIOClient from "socket.io-client";
import config from "../../config/config.json";
const ENDPOINT = config.socket.path;

export const Socket = socketIOClient(ENDPOINT);
