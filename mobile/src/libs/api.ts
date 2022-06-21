import axios from "axios";

export const api = axios.create({
    baseURL:'http://192.168.1.185:3333'  //inform endereço IP MaC- Server(Back-END), não recomanda-se IP:localHost para mobile Android.
});