import api from "./axios";

export const getTravelHistory = async () => {
    const response = await api.get("/travel-history");

    return response.data;
};

export const createTravelHistory = async (travelData) => {
    const response = await api.post(
        "/travel-history",
        travelData
    );

    return response.data;
};

export const updateTravelHistory = async (id, travelData) => {
    const response = await api.put(
        `/travel-history/${id}`,
        travelData
    );

    return response.data;
};

export const deleteTravelHistory = async (id) => {
    const response = await api.delete(
        `/travel-history/${id}`
    );

    return response.data;
};