import axios from "axios";


const UseAxiosPublic = () => {
     const axiosSecure = axios.create({
        baseURL:'http://localhost:4000'
    })
    return axiosSecure;
};

export default UseAxiosPublic;