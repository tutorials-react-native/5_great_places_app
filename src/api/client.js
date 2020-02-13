import baseUrls from "./config";
import axios from "axios";

const googleGeoClient = axios.create({
  baseURL: baseUrls.googleGeocode
});

export { googleGeoClient };
