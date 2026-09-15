import api from "./axios";

export const getPassport = async () => {
    const response = await api.get("/passport");
    return response.data;
};

export const createPassport = async (passportData) => {
    const response = await api.post("/passport", passportData);
    return response.data;
};

export const updatePassport = async (id, passportData) => {
    const response = await api.put(`/passport/${id}`, passportData);
    return response.data;
};

export const deletePassport = async (id) => {
    const response = await api.delete(`/passport/${id}`);
    return response.data;
};