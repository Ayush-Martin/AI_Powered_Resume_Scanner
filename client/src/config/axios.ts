import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { envConfig } from "./env";
import type { IResponse } from "@/types/responseType";
import { AuthApiEndPoints } from "@/constants/apiEndPoints";

const SERVER_BASE_URL = envConfig.API_BASE_URL;

export const appApi = axios.create({
  baseURL: SERVER_BASE_URL,
  withCredentials: true,
});

appApi.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState().user;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

appApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      console.log(error.response.data.error, error.response.data.message);
    } else {
      console.log("Network error or server unreachable", error.message);
    }

    if (
      error.response.status == 401 &&
      error.response.data.error == "Invalid token" &&
      !originalRequest._retry
    ) {
      try {
        const res: IResponse = await axios.get(
          `${SERVER_BASE_URL}/${AuthApiEndPoints.REFRESH_TOKEN_API}`,
          {
            withCredentials: true,
          },
        );
        const newAccessToken = res.data.data as string;

        useAuthStore.getState().login(newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return appApi(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        console.error(err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default appApi