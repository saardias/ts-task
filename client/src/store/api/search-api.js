import AxiosInstance from '../../axios';
import ServerRoutes from './routes';

const searchByText = async (text, page = 1, limit = 10) => {
    try {
        let url = ServerRoutes.search.getSearchResults;
        url += `?text=${text}`;
        url += `&page=${page}`;
        url += `&limit=${limit}`;

        const { status, data, error } = await AxiosInstance.get(url);
        return { data: data, status: status, error: error };
    } catch (error) {
        let message = error?.response?.data?.error || 'Some error happen, please try again.';
        let status = error?.response?.status || 500;
        return {
            error: {
                message, status
            }
        };
    }
}

const recordSearchByText = async (text, page = 1, limit = 10) => {
    try {
        let url = ServerRoutes.search.getRecordSearchResults;
        const body = {
            text, page, limit
        }

        const { status, data, error } = await AxiosInstance.post(url, body);
        return { data: data, status: status, error: error };
    } catch (error) {
        let message = error?.response?.data?.error || 'Some error happen, please try again.';
        let status = error?.response?.status || 500;
        return {
            error: {
                message, status
            }
        };
    }
}

const getHistory = async () => {
    try {
        let url = ServerRoutes.search.getRecordSearchResults;

        const { status, data, error } = await AxiosInstance.get(url);
        return { data: data, status: status, error: error };
    } catch (error) {
        let message = error?.response?.data?.error || 'Some error happen, please try again.';
        let status = error?.response?.status || 500;
        return {
            error: {
                message, status
            }
        };
    }
}


const searchApi = {
    searchByText,
    recordSearchByText,
    getHistory
}

export default searchApi;