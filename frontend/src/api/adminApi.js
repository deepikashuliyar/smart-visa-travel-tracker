import api from "./axios";

export const getUsers = async () => {
    const response = await api.get("/admin/users");
    return response.data;
};

export const getCompliance = async () => {
    const response = await api.get("/admin/compliance");
    return response.data;
};

export const getAnalytics = async () => {
    const response = await api.get("/admin/analytics");
    return response.data;
};