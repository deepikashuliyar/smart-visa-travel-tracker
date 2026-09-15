import api from "./axios";

export const getInsurance = async () => {
    const response = await api.get("/insurance");
    return response.data;
};

export const createInsurance = async (insuranceData) => {
    const response = await api.post("/insurance", insuranceData);
    return response.data;
};

export const updateInsurance = async (id, insuranceData) => {
    const response = await api.put(`/insurance/${id}`, insuranceData);
    return response.data;
};

export const deleteInsurance = async (id) => {
    const response = await api.delete(`/insurance/${id}`);
    return response.data;
};