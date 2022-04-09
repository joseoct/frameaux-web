import axios from 'axios';
import { parseCookies } from 'nookies';

let cookies = parseCookies();

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${cookies['fa.to']}`,
  },
});
