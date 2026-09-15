import api from "./axios";

export const getVisas = async () => {
    const response = await api.get("/visa");
    return response.data;
};

export const createVisa = async (visaData) => {
    const response = await api.post("/visa", visaData);
    return response.data;
};

export const updateVisa = async (id, visaData) => {
    const response = await api.put(`/visa/${id}`, visaData);
    return response.data;
};

export const deleteVisa = async (id) => {
    const response = await api.delete(`/visa/${id}`);
    return response.data;
};