import axiosClient from "./axiosClient";

const BASE_URL = '/api/v1/sim-cards';

export const getAllSimCards = ()=> axiosClient.get(BASE_URL);

export const getSimCardById = (id) => axiosClient.get(`${BASE_URL}/${id}`);

export const createSimCard = (data) => axiosClient.post(BASE_URL, data);

export const updateSimCard = (id, data) => axiosClient.put(`${BASE_URL}/${id}`, data);

export const deleteSimCard = (id) => axiosClient.delete(`${BASE_URL}/${id}`)

export const searchByMsisdn = (msisdn) => axiosClient.get(`${BASE_URL}/search`, { params: { msisdn } });