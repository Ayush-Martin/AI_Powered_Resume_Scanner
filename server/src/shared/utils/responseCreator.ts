import { IResponse } from "../types/appResponse.type.js";

/**
 * Returns a success response object with a given message and optional data.
 *
 * @template T
 * @param {string} message - The message to be returned in the response.
 * @param {T} [data] - Optional data to be returned in the response.
 * @returns {IResponse<T>} - The success response object.
 */
export const successResponse = <T>(message: string, data?: T): IResponse<T> => {
  return {
    success: true,
    message,
    ...(data !== undefined && { data }),
  } as IResponse<T>;
};

/**
 * Returns an error response object with a given error message.
 *
 * @param {string} error - The error message to be returned in the response.
 * @returns {IResponse<null>} - The error response object.
 */
export const errorResponse = (error: string): IResponse<null> => {
  return { success: false, error };
};