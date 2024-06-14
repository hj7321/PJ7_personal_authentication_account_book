import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

export default axiosInstance;
