import { io } from 'socket.io-client';


let API_ENDPOINT;
if(import.meta.env.MODE === "development"){
    API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT_DEV;
}else{
    API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT_PROD;
}

console.log(API_ENDPOINT)

export const socket = io(API_ENDPOINT,{ autoConnect: false });