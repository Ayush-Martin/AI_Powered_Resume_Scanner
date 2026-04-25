/* eslint-disable @typescript-eslint/no-explicit-any */
import { envConfig } from "@/config/env";
import type { IResponse } from "@/types/responseType";
import axios from "axios";
import { toast } from "sonner";


const authApi = axios.create({
  baseURL: envConfig.API_BASE_URL,
  withCredentials: true,
});

/**
 * 
 * @param email 
 * @param password 
 * @returns 
 * Service function to handle user login
 * - Sends credentials to the server
 * - Returns access token on success, handles error toast on failure
 */
export const loginService = async (
  email: string,
  password: string,
): Promise<string | void> => {
  try {
    const res: IResponse = await authApi.post("/auth/login", {
      email,
      password,
    });

    return res.data.data.accessToken;
  } catch (err) {
    const errorMessage =
      (err as any).response?.data?.error || "Login failed. Please try again.";
    toast.error(errorMessage);
    console.log(err);
  }
};

/**
 * 
 * @param username 
 * @param email 
 * @param password 
 * @returns 
 * Service function to handle user registration
 * - Sends user details to the server
 * - Returns success status and handles error toast on failure
 */
export const registerService = async (
  username: string,
  email: string,
  password: string,
): Promise<boolean> => {
  try {
    await authApi.post("/auth/register", {
      username,
      email,
      password,
    });
    toast.success("Registration successful! Please login.");
    return true;
  } catch (err) {
    const errorMessage =
      (err as any).response?.data?.error ||
      "Registration failed. Please try again.";
    toast.error(errorMessage);
    console.log(err);
    return false;
  }
};