import { AxiosError, AxiosRequestConfig } from 'axios'
import { getAuth } from 'firebase/auth';
import axiosApiGatewayInstance from './baseApi'
import { exchangeIdTokenForRefreshToken } from './refreshToken'
import {useDispatch} from "react-redux";
import {setLogin} from "../state";
const setUpInterceptor = (store) => {
    const auth = getAuth();
    const handleError = async (error) => {
        return Promise.reject(error)
    }

    axiosApiGatewayInstance.interceptors.request.use(
        (config) => {
            const token = store.getState().token
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);

        }
    )

    axiosApiGatewayInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Get the new token
                    const newToken = await exchangeIdTokenForRefreshToken(store.getState().refreshToken);

                    // Update the token in the Redux store
                    const dispatch = useDispatch();
                    dispatch(setLogin({
                        user: newToken.displayName,
                        token: newToken.idToken,
                        refreshToken: newToken.refreshToken,
                    }));

                    // Set the new token in the Authorization header
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    // Resend the original request with the new token
                    return axiosApiGatewayInstance(originalRequest);
                } catch (error) {
                    console.error(error);
                    throw new Error('Failed to refresh token');
                }
            }

            return Promise.reject(error);
        }
    );
}

export default setUpInterceptor