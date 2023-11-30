const baseUrl = "https://kejowijaya.com/backend/public/api";

import axios from "axios";

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
