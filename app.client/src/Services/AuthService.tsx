import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import apiClient from './ApiClient';

const api = "/api/account";

export const loginAPI = async (username: string, password: string) => {
    console.log("bat dau goi o day");
    try {
        const data = await apiClient.post<UserProfileToken>(api + "/login", {
            username: username,
            password: password,
        });
        console.log("in ra o day");
        console.log(data);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const registerAPI = async (
    email: string,
    username: string,
    password: string
) => {
    try {
        const data = await apiClient.post<UserProfileToken>(api + "/register", {
            email: email,
            username: username,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};
