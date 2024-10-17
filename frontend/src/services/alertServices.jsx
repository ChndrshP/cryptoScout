import axios from "axios";

const API_URL = "http://localhost:5000";

//Create an alert
export const createAlert = async(alertData, token) => {
    const config = {
        headers:{
            'Authorization': token
        }
    };
    const response = await axios.post(`${API_URL}/api/alerts/create`, alertData, config);
    return response.data;
};

//Get all alerts for the authenticated user
export const getAlerts = async(token) => {
    const config = {
        headers:{
            'Authorization': token
        }
    };
    const response = await axios.get(`${API_URL}/api/alerts`, config);
    return response.data;
};

//Update an alert
export const updateAlert = async(alertData, token) => {
    const config = {
        headers:{
            'Authorization': token
        }
    };
    const response = await axios.put(`${API_URL}/api/alerts/update/${id}`, updateData, config);
    return response.data;
};

//Delete an alert
export const deleteAlert = async (id, token) => {
    const config = {
        headers: {
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/api/alerts/delete/${id}`, config);
    return response.data;
};