import axios from "axios";

const token = '234c58b8-0848-4abe-bf26-f0ff64ceb548'
const api = 'e5666eb3-83be-46ad-b38a-45c04b0fa9c4'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  headers: {
    Authorization: `Bearer ${token}`,
    'API-KEY': api,
  },
})