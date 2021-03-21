import axios from "axios";

const client = axios.create();
client.defaults.baseURL =
    process.env.NODE_ENV === "development"
        ? "/"
        : "https://api.ohmydrawer.com/";
client.defaults.withCredentials = "include";

export default client;
