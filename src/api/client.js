import axios from "axios";

const client = axios.create();
client.defaults.baseURL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:4000/"
        : "https://api.ohmydrawer.com/";
client.defaults.withCredentials = true;

export default client;
