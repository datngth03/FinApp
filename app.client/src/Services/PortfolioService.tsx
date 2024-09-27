import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import { handleError } from "../Helpers/ErrorHandler";
import apiClient from './ApiClient';

const api = "/api/portfolio/";

export const portfolioGetAPI = async () => {
    try {
        const data = await apiClient.get<PortfolioGet[]>(api);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const portfolioAddAPI = async (symbol: string) => {
    try {
        const data = await apiClient.post<PortfolioPost>(api + `?symbol=${symbol}`, null); // Sử dụng apiClient
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const portfolioDeleteAPI = async (symbol: string) => {
    try {
        const data = await apiClient.delete<PortfolioPost>(api + `?symbol=${symbol}`); // Sử dụng apiClient
        return data;
    } catch (error) {
        handleError(error);
    }
};

