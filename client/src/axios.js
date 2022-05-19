import axios from 'axios';
import { baseUrl } from './store/api/routes';

let headers = {
    client: 'web',
    clientVersion: 0.1
};

const instance = axios.create({
    baseURL: baseUrl,
    headers: headers
});

export default instance;
