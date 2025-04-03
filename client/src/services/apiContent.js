import axios from "./axios";

export const getContentRequest = async () => {
    return axios.get("/content");
};

export const insertContentRequest = async (content) => {
    return axios.post("/content", content);
}

export const updateContentRequest = async (content) => {
    return axios.put(`/content`, content);
};
