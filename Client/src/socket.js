import { reactive } from 'vue';
import { io } from "socket.io-client";

export const socket = io(`https://${window.location.hostname}:3001`, {secure: true});

export const socketState = reactive({
    message: '',
});

socket.on('newPosts', (message) => {
    console.log(message)
    socketState.message = message;
});