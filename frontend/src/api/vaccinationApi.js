import api from "./axios";

export const getVaccinations = async () => {
    const response = await api.get("/vaccination");
    return response.data;
};

export const createVaccination = async (vaccinationData) => {
    const response = await api.post("/vaccination", vaccinationData);
    return response.data;
};

export const updateVaccination = async (id, vaccinationData) => {
    const response = await api.put(`/vaccination/${id}`, vaccinationData);
    return response.data;
};

export const deleteVaccination = async (id) => {
    const response = await api.delete(`/vaccination/${id}`);
    return response.data;
};