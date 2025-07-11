import axios from "axios";


const UseAxiosPublic = () => {
     const axiosSecure = axios.create({
        baseURL:'http://localhost:5000'
    })
    return axiosSecure;
};

export default UseAxiosPublic;