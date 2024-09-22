import axios from "axios";
export const baseURL = `https://localhost:7094`;
const axiosClient = axios.create({
    baseURL: `https://localhost:7094/api/`,
    headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    }
});

axiosClient.interceptors.response.use(
    res => res,
    error => {
        if (error.response.status === 401) {
            //&& window.location.href !== `http://localhost:3000/login`
            console.log(error.response.status);
            setTimeout(() =>{
            window.location.href = `http://localhost:3000/Login`;
            }, 1200)
            
            
        } 
        
        console.error(`Error! Status Code: ` + error.response.status);
        return Promise.reject(error);
    }
);

export default axiosClient;