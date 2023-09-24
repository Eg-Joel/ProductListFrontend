import axios from "axios";
const baseUrl = "https://productlist-pkbo.onrender.com/api/" 
const instance =axios.create({
    baseURL:baseUrl,
})

export default instance