import axios from 'axios';
import { BASE_URL } from './config';

const myAxios = axios.create({
  baseURL: BASE_URL,
});

export default myAxios;
