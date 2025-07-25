import axios from "axios";


const UseAxiosPublic = () => {
     const axiosSecure = axios.create({
        baseURL:'https://edu-server-ten.vercel.app'
    })
    return axiosSecure;
};

export default UseAxiosPublic;