import Axios from 'axios';
import { BASE_URL } from '@env';

const Api = Axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
});

const onSucess = res => {
    try {
        return {
            data: res.data,
            error: null
        }
    } catch (err) {
        return {
            data: null,
            error: err.response ? err.response.data : err.message,
        }
    }
};

const onRejected = err => {
    try {
        if (err.response) {
            if (Array.isArray(err.response.data.error)) {
                return {
                    data: null,
                    error: err.response.data.error.toString(),
                };
            }
            return {
                data: null,
                error: err.response.data.error,
            };
        }
        return {
            data: null,
            error: "Falha na conexão!",
        };
    } catch (err) {
        return {
            data: null,
            error: err.response ? err.response.data : err.message,
        }
    }
}

Api.interceptors.response.use(onSucess, onRejected);

export default Api;
