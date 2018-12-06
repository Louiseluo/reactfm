import axios from 'axios'


const api = process.env.REACT_APP_RECORDS_API_URL || "https://5bf4d02c2a6f080013a34da8.mockapi.io"
// https://5bf4d02c2a6f080013a34da8.mockapi.io/api/v1/records

export const getAll = () =>
    axios.get(`${api}/api/v1/records`);

export const Create = (body) =>
    axios.post(`${api}/api/v1/records`,body);

export const Update = (id,body) =>
    axios.put(`${api}/api/v1/records/${id}`,body);
export const  remove = (id)=>
    axios.delete(`${api}/api/v1/records/${id}`);
