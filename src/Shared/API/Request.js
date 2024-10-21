import axios from "axios"



const baseURL = "https://vendors-node.onrender.com/api"
export const publicRequest = axios.create({
    baseURL : baseURL
})




