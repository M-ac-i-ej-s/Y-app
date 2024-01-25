import { reactive } from 'vue';
import { io } from "socket.io-client";

export const socket = io('http://localhost:3001');

export const socketState = reactive({
    message: '',
});

socket.on('newPosts', (message) => {
    socketState.message = message;
});