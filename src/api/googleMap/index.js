import { googleGeoClient } from "../client";
import ENV from "env";

const env = ENV();

const api = {
  convertCoordToAddress: async (lat, lng) => {
    return await googleGeoClient(
      `json?latlng=${lat},${lng}&language=ko&key=${env.googleApiKey}`
    ).catch(error => {
      console.log(error);
      throw error;
    });
  }
};

export default api;
